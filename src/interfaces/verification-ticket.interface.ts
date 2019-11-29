// Camel casing is not done as data is added to the database as received from the SDK for maintaining consistency
export interface IVerificationTicketData {
  verifier_id: string;
  signature: string;
}
