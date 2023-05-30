import React from "react";
import { ContractObject } from "../Contract/Contract";
import "./ContractCardList.css";
import ContractCardContainer from "./ContractCardContainer/ContractCardContainer";
import { createTheme, styled } from "@mui/material";
import { Slide } from "@mui/material";

interface ContractCardsProps {
    contracts: ContractObject[];
    viewStyle: boolean;
    updateTotalBuyBackPrice: (id: string, newPrice: number) => void;
    deleteContract: (id: string) => void;
}

const ContractCardList: React.FC<ContractCardsProps> = (props) => {
    const { contracts, viewStyle, updateTotalBuyBackPrice, deleteContract } = props;

    return (
        <div className="ContractCardList">
            {contracts &&
                contracts.map((contract) => (
                    <ContractCardContainer
                        key={contract.id}
                        contract={contract}
                        viewStyle={viewStyle}
                        updateTotalBuyBackPrice={updateTotalBuyBackPrice}
                        deleteContract={deleteContract}
                    />
                ))}
            {viewStyle && <div style={{height: "220px"}}/>}
        </div>
    );
};

export default ContractCardList;
