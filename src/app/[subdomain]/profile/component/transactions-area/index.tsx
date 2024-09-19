'use client';

import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { TransactionCard } from "@/components/transaction-card";
import { ColumnContainer, Container } from "@/components/ui";
import { USING_MOCK } from "@/config/contants";
import { mockTransactions } from "@/mock";

function TransactionsArea() {
    const { account } = useWallet();
    let transactions: any = [];

    if (USING_MOCK) {
        transactions = mockTransactions;
    }
    return (
        <Container title="Transactions">
            <ColumnContainer>
                {transactions && transactions.map((transaction: any) => (
                    <TransactionCard
                        key={transaction.from + transaction.to + transaction.transaction_timestamp}
                        from={transaction.from}
                        to={transaction.to}
                        time={transaction.transaction_timestamp}
                        tag={transaction.tag}
                    />
                ))}
            </ColumnContainer>
        </Container>

    )
}
export default TransactionsArea;