import mongoose from 'mongoose';

export interface Example {
	name: string;
}
 
const schema = new mongoose.Schema({
  name: String,
});
 
const Model = mongoose.model<Example & mongoose.Document>('Example', schema);
 
export default Model;