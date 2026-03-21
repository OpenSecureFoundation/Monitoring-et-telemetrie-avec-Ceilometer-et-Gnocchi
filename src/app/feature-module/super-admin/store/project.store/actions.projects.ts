// get all projects
export class GetProjects {
  static readonly type = '[Project] GetProjects';
  constructor() {}
}

// get project
export class GetProject {
  static readonly type = '[Project] GetProject';
  constructor(public projectId: string) {}
}
