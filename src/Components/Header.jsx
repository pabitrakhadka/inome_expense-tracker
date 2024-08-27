import React from "react";
import BtnComp from "./BtnComp";
import { colors } from "../Methods/colors";
import { ArrowCircleUp, ArrowCircleDown } from "iconsax-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-center items-center">
      {/* <Link href="/" passHref>
        <BtnComp
          icon={<ArrowCircleUp size="20" color="white" />} // Up arrow for adding income
          name="Add Income"
          color={colors.green}
          textColor="white"
        />
      </Link>
      <Link href="/expense" passHref>
        <BtnComp
          icon={<ArrowCircleDown size="20" color="white" />} // Down arrow for adding expense
          name="Add Expense"
          color={colors.gray}
          textColor="white"
        />
      </Link>
      <BtnComp name="View Income" color={colors.blue} />
      <BtnComp name="View Expense" color={colors.blue} />
      <BtnComp name="Income Expense Curve" color={colors.blue} />
      <BtnComp name="View Balance" color={colors.blue} /> */}
    </div>
  );
};

export default Header;
