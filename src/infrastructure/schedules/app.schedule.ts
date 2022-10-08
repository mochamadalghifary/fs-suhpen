import { MessageContract } from "src/modules/support/queue/contracts/message.contract";

export abstract class AppSchedule {
    abstract handle(
        messageContract: MessageContract,
        delay: number,
    ): Promise<boolean>;
}
