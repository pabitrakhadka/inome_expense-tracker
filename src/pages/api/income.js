import prisma from "../db/db.config";
import { incomeSchema } from "../validation/index";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { userId, balance } = req.body;
      const { data } = req.query;
      if (userId && balance && data === "balance") {
        const saveData = await prisma.balance.create({
          data: {
            userId: parseInt(userId),
            balance: parseFloat(balance)
          }
        });
        if (saveData) {
          return res.status(200).json({ status: true, message: "balance is Addes", saveData });
        } else {
          return res.status(400).json({ status: false, message: "Error Insert Balance", saveData });
        }
      }
      const { error, value } = incomeSchema.validate(req.body);
      if (error) {
        console.log("Validation error", error);
        return res.status(400).json({ status: false, message: error.message });
      } else {
        const { userId, price, types, description } = value;
        let saveResult;
        if (types === "income") {
          const user = await prisma.balance.findFirst({
            where: {
              userId: userId
            }, select:
            {
              balance: true,
              userId: true,
            }
          });

          if (!user) {
            return res.status(400).json({ status: false, message: "User not fouond" })
          } else {

            const updatedBalance = user.balance + price;

            const updateUser = await prisma.balance.update({
              where: {
                userId: userId,
              }, data: {
                balance: updatedBalance
              }
            });

            if (updateUser) {
              saveResult = await prisma.income.create({
                data: {
                  userId: userId,
                  price: price,
                  description: description,
                  types: types
                }
              })
              if (saveResult) {
                return res.status(200).json({
                  status: true,
                  message: "Added Successfully",
                  data: saveResult,
                });
              } else {
                return res.status(500).json({
                  status: false,
                  message: "Failed to save the data",
                });
              }
            }

          }
        }
        if (types == "expense") {
          const user = await prisma.balance.findFirst({
            where: {
              userId: userId,
            }, select: {
              balance: true,
              userId: true
            }
          });

          if (!user) {
            return res.status(400).json({ status: false, message: "User not fouond" })
          } else {
            const updatedBalance = user.balance - price;
            const updateUser = await prisma.balance.update({
              where: {
                userId: user.userId
              }, data: {
                balance: updatedBalance
              }
            });
            if (updateUser) {
              saveResult = await prisma.income.create({
                data: {
                  userId: userId,
                  price: price,
                  description: description,
                  types: types
                }
              })
              if (saveResult) {
                return res.status(200).json({
                  status: true,
                  message: "Added Successfully",
                  data: saveResult,
                });
              } else {
                return res.status(500).json({
                  status: false,
                  message: "Failed to save the data",
                });
              }
            }

          }
        }

      }
    } else if (req.method === "GET") {
      const data = await prisma.income.findMany();
      if (data) {
        return res.status(200).json({
          status: true,
          message: "Success Data fetch",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Data Not Found!",
        });
      }
    } else {
      return res.status(405).json({
        status: false,
        message: "Method not allowed",
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
