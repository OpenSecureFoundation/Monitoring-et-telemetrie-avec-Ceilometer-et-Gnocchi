export class GetPlans {
  static readonly type = '[Plan] Get Plans';
}

export class GetPlan {
  static readonly type = '[Plan] Get Plan';
  constructor(public id: string) {}
}

export class CreatePlan {
  static readonly type = '[Plan] Create Plan';
  constructor(public payload: any) {}
}

export class DeletePlan {
  static readonly type = '[Plan] Delete Plan';
  constructor(public id: string) {}
}

export class ChangePlanStatus {
  static readonly type = '[Plan] Change Plan Status';
  constructor(
    public id: string,
    public active: boolean,
  ) {}
}

export class UpdatePlan {
  static readonly type = '[Plan] Update plan';
  constructor(
    public planId: string,
    public payload: any,
  ) {}
}

export class GetAvailableMetrics {
  static readonly type = '[Plan] Get Available Metrics';
  constructor(public id: string) {}
}

export class AddMetricPrice {
  static readonly type = '[Plan] Add Metric price';
  constructor(
    public id: string,
    public payload: any,
  ) {}
}
