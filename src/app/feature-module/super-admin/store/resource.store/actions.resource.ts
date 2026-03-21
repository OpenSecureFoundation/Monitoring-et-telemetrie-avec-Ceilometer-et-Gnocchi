import { Interval } from '../../models/interval.model';

// Get resource
export class GetResource {
  static readonly type = '[Resource] GetResource';
  constructor(
    public projectId: string,
    public resourceId: string,
    public resourceType: string,
  ) {}
}

// Get metric
export class GetMetric {
  static readonly type = '[Metric] GetMetric';
  constructor(
    public projectId: string,
    public instanceId: string,
    public range: any,
  ) {}
}

// Get alarms
export class GetAlarm {
  static readonly type = '[Alarm] GetAlarm';
  constructor(
    public projectId: string,
    public resourceId: string,
  ) {}
}

export class GetPort {
  static readonly type = '[Port] GetPort';
  constructor(
    public projectId: string,
    public instanceId: string,
  ) {}
}

export class GetTrafic {
  static readonly type = '[Trafic] Get trafic network';
  constructor(
    public projectId: string,
    public instanceId: string,
    public interval: any,
  ) {}
}
export class GetInstanceAlarms {
  static readonly type = ' [Alarms] Get Instance Alarms';
  constructor(
    public projectId: string,
    public instanceId: string,
  ) {}
}

export class CreateAlarm {
  static readonly type = '[Alarm] Create Alarm';
  constructor(
    public projectId: string,
    public payload: any,
  ) {}
}
