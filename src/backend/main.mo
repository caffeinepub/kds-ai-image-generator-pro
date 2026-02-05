import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization & Account Management
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Project Management
  type AssetMetadata = {
    assetId : Text;
    assetType : Text;
    description : Text;
  };

  public type Project = {
    id : Text;
    owner : Principal;
    projectName : Text;
    toolType : Text;
    preset : Text;
    configuration : Text;
    inputAssets : [AssetMetadata];
    outputAssets : [AssetMetadata];
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  // Map entry type for projects
  type ProjectMapEntry = {
    project : Project;
    isDeleted : Bool;
  };

  module Project {
    public func compareByUpdatedAt(project1 : Project, project2 : Project) : Order.Order {
      Int.compare(project2.updatedAt, project1.updatedAt);
    };
  };

  let projectsMap = Map.empty<Text, ProjectMapEntry>();

  public shared ({ caller }) func saveProject(projectName : Text, toolType : Text, preset : Text, configuration : Text, inputAssets : [AssetMetadata], outputAssets : [AssetMetadata]) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only logged-in users can save projects");
    };

    let projectId = generateProjectId(caller, projectName, Time.now());

    let project : Project = {
      id = projectId;
      owner = caller;
      projectName;
      toolType;
      preset;
      configuration;
      inputAssets;
      outputAssets;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    let entry : ProjectMapEntry = {
      project;
      isDeleted = false;
    };

    projectsMap.add(projectId, entry);
    projectId;
  };

  public query ({ caller }) func listProjects() : async [Project] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only logged-in users can list projects");
    };

    // Filter projects to only show those owned by the caller
    let userProjects = projectsMap.values().toArray().filter(func(entry : ProjectMapEntry) : Bool {
      entry.project.owner == caller and not entry.isDeleted
    }).map(func(entry : ProjectMapEntry) : Project {
      entry.project
    });

    userProjects.sort(Project.compareByUpdatedAt);
  };

  public query ({ caller }) func getProject(projectId : Text) : async Project {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only logged-in users can view projects");
    };

    switch (projectsMap.get(projectId)) {
      case (null) { Runtime.trap("Project not found") };
      case (?entry) {
        // Verify ownership or admin access
        if (caller != entry.project.owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own projects");
        };
        if (entry.isDeleted) {
          Runtime.trap("Project not found");
        };
        entry.project;
      };
    };
  };

  public shared ({ caller }) func deleteProject(projectId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only logged-in users can delete projects");
    };

    switch (projectsMap.get(projectId)) {
      case (null) { Runtime.trap("Project not found") };
      case (?entry) {
        if (entry.isDeleted) {
          Runtime.trap("Project not found");
        };
        // Verify ownership or admin access
        if (caller != entry.project.owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the owner or admins can delete projects");
        };
        projectsMap.remove(projectId);
      };
    };
  };

  public shared ({ caller }) func updateProjectText(projectId : Text, newConfiguration : Text, newProjectName : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only logged-in users can update projects");
    };

    switch (projectsMap.get(projectId)) {
      case (null) { Runtime.trap("Project not found") };
      case (?entry) {
        if (entry.isDeleted) {
          Runtime.trap("Project not found");
        };
        // Verify ownership - only the owner can update (not even admins)
        if (caller != entry.project.owner) {
          Runtime.trap("Unauthorized: Only project owners can update project text");
        };

        let updatedProject : Project = {
          entry.project with
          configuration = newConfiguration;
          projectName = newProjectName;
          updatedAt = Time.now();
        };

        let updatedEntry : ProjectMapEntry = {
          entry with
          project = updatedProject;
        };

        projectsMap.add(projectId, updatedEntry);
      };
    };
  };

  func generateProjectId(caller : Principal, projectName : Text, timestamp : Time.Time) : Text {
    let principalBytes = caller.toText();
    let timeStr = timestamp.toText();
    let sanitizedProjectName = projectName.map(
      func(c) { if (c == ' ') { '_' } else { c } },
    );
    principalBytes.concat(sanitizedProjectName).concat(timeStr);
  };
};
