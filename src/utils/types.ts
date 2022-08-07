interface IProbabilityExecuter<T = any> {
  successExecuter: () => T;
  failExecuter: () => T;
}

export interface IProbabilityExecuterPayload extends IProbabilityExecuter {
  probability: number;
}

export interface IProbabilityExecuterResultPayload
  extends IProbabilityExecuterPayload {
  success?: boolean;
}
