import VerificationTicket from '../../entities/verification-ticket.entity';
import { IVerificationTicketData } from '../../interfaces';

import logger from '../../lib/logger';

class VerificationTicketService {
  add = async (block_hash: string, verification_tickets: IVerificationTicketData[], opts) => {
    try {
      verification_tickets.map(ticket => {
        return (ticket.block_hash = block_hash);
      });

      await VerificationTicket.create(verification_tickets, opts);

      logger.info(`Verification Tickets Stored successfully, block hash: ${block_hash}`);
    } catch (error) {
      logger.error(`Error in store Verification Tickets for block hash : ${block_hash}, ${error}`);
    }
  };
}

export const verificationTicketService = new VerificationTicketService();
