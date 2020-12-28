import ExampleModel, { Example } from '../db/models/example';

export function createExample(name: string): Promise<Example> {
  const createdPost = new ExampleModel({name});
  return createdPost.save();
}