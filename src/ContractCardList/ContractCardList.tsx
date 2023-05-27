import React from "react";
import { ContractObject } from "../Contract/Contract";
import "./ContractCardList.css";
import ContractCardContainer from "./ContractCardContainer/ContractCardContainer";
import { createTheme, styled } from "@mui/material";
import { Slide } from "@mui/material";

interface ContractCardsProps {
    contracts: ContractObject[];
    updateTotalBuyBackPrice: (id: string, newPrice: number) => void;
    deleteContract: (id: string) => void;
}

const ContractCardList: React.FC<ContractCardsProps> = (props) => {
    const { contracts, updateTotalBuyBackPrice, deleteContract } = props;

    return (
        <div className="ContractCardList">
            {contracts &&
                contracts.map((contract) => (
                    <ContractCardContainer
                        key={contract.id}
                        contract={contract}
                        updateTotalBuyBackPrice={updateTotalBuyBackPrice}
                        deleteContract={deleteContract}
                    />
                ))}
        </div>
    );
};

export default ContractCardList;
