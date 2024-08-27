import prisma from "../db/db.config";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const { count, userId } = req.query;

            if (count === "incomeexp") {
                const countIncome = await prisma.income.findMany({
                    where: {
                        userId: parseInt(userId),
                        types: "income"
                    }, select: {
                        price: true,
                    }
                });
                const countBalance = await prisma.balance.findMany({
                    where: {
                        userId: parseInt(userId),
                    }, select: {
                        balance: true
                    }
                });

                const countExpense = await prisma.income.findMany({
                    where: {
                        userId: parseInt(userId),
                        types: "expense"
                    }, select: {
                        price: true,
                    }
                });
                console.log("count income balance", countIncome);
                const totalBalance = countBalance.reduce((sum, item) => {
                    return sum + item.balance;
                }, 0);
                const totalIncome = countIncome.reduce((sum, item) => {
                    return sum + item.price;
                }, 0);
                const totalExpense = countExpense.reduce((sum, item) => {
                    return sum + item.price;
                }, 0);
                if (countIncome && countExpense && countBalance) {
                    res.status(200).json({ status: true, message: "Cont", data: { totalIncome, totalExpense, totalBalance } })
                } else {
                    res.status(200).json({ status: false, message: "Error" })
                }

            }
        }
    } catch (error) {
        return res.status(401).json({ status: true, message: "Method Not Allow", error })
    }
}