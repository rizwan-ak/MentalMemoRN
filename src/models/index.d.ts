import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Recording {
  readonly id: string;
  readonly recordedBy?: string;
  readonly date?: string;
  readonly time?: string;
  readonly file?: string;
  constructor(init: ModelInit<Recording>);
  static copyOf(source: Recording, mutator: (draft: MutableModel<Recording>) => MutableModel<Recording> | void): Recording;
}