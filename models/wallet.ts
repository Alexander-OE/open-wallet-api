import {Schema, model} from "mongoose";

interface WalletDocument {
    currency: string;
    amount: number;
    userId: typeof Schema.Types.ObjectId
}

const WalletSchema = new Schema <WalletDocument>({
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
       type: Schema.Types.ObjectId,
       ref: "User"
    }
})

export const WalletModel = model<WalletDocument>('Wallet', WalletSchema)