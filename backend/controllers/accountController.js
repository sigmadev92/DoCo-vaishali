// backend\controllers\accountController.js
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

// Deposit money
export const deposit = async (req, res) => {
  console.log(`account Controller : deposit`);
  const { userId, amount } = req.body;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.send({ status: false, message: "User not found" });
    }

    user.balance += amount;

    const transaction = new Transaction({
      userId: user._id,
      type: "deposit",
      amount,
      description: "Deposit",
      balanceAfterTransaction: user.balance,
    });

    await user.save();
    await transaction.save();

    res.send({
      status: true,
      message: "Deposit successful",
      balance: user.balance,
    });
  } catch (error) {
    res.send({ status: false, message: `Error during deposit", ${error}` });
  }
};

// Withdraw money
export const withdraw = async (req, res) => {
  console.log(`account Controller : withdraw`);
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.send({ status: false, message: "User not found" });
    if (user.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    user.balance -= amount;

    const transaction = new Transaction({
      userId: user._id,
      type: "withdraw",
      amount,
      description: "Withdraw",
      balanceAfterTransaction: user.balance,
    });

    await user.save();
    await transaction.save();

    res.send({
      status: true,
      message: "Withdrawal successful",
      balance: user.balance,
    });
  } catch (error) {
    res.send({ status: false, message: "Error during withdrawal", error });
  }
};

// Transfer money
export const transfer = async (req, res) => {
  console.log(`account Controller : transfer`);
  const { fromUserId, recipientEmail, amount } = req.body;

  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findOne({ email: recipientEmail });

    if (!fromUser) {
      return res.send({ status: false, message: "Sender not found" });
    }

    if (!toUser) {
      return res.send({ status: false, message: "Recipient not found" });
    }

    if (fromUser.balance < amount) {
      return res.send({ status: false, message: "Insufficient balance" });
    }

    fromUser.balance -= amount;
    toUser.balance += amount;

    const fromTransaction = new Transaction({
      userId: fromUser._id,
      type: "transfer",
      amount,
      description: `Transfer to ${toUser.email}`,
      balanceAfterTransaction: fromUser.balance,
    });

    const toTransaction = new Transaction({
      userId: toUser._id,
      type: "transfer",
      amount,
      description: `Transfer from ${fromUser.email}`,
      balanceAfterTransaction: toUser.balance,
    });

    await fromUser.save();
    await toUser.save();
    await fromTransaction.save();
    await toTransaction.save();

    res.send({ status: true });
  } catch (error) {
    console.log("Error during transfer:", error);
    res.send({ status: false, message: "Error during transfer", error });
  }
};

// View balance
export const viewBalance = async (req, res) => {
  console.log(`account Controller : view balance`);
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const response = res.send({ status: false, message: "User not found" });
      return response;
    }
    res.send({ status: true, balance: user.balance });
  } catch (error) {
    res.send({ status: false, message: "Error fetching balance", error });
  }
};

// transaction history
export const miniStatement = async (req, res) => {
  console.log(`account Controller : mini statements`);
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    if (!transactions || transactions.length === 0) {
      return res.send({
        status: true,
        message: "No transactions found for user",
      });
    }
    res.send({ status: true, data: transactions });
  } catch (error) {
    console.log("Error fetching mini statement:", error);
    res.send({
      status: false,
      message: "Error fetching mini statement",
      error,
    });
  }
};
