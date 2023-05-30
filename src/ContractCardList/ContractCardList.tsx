import React from "react";
import { ContractObject } from "../Contract/Contract";
import "./ContractCardList.css";
import ContractCardContainer from "./ContractCardContainer/ContractCardContainer";
import { createTheme, styled } from "@mui/material";
import { Slide } from "@mui/material";

interface ContractCardsProps {
    contracts: ContractObject[];
    viewStyle: boolean;
    updateContract: (contract: ContractObject) => void;
    deleteContract: (id: string) => void;
}

const ContractCardList: React.FC<ContractCardsProps> = (props) => {
    const { contracts, viewStyle, updateContract, deleteContract } = props;

    return (
        <div className="ContractCardList">
            {contracts &&
                contracts.map((contract) => (
                    <ContractCardContainer
                        key={contract.id}
                        contract={contract}
                        viewStyle={viewStyle}
                        updateContract={updateContract}
                        deleteContract={deleteContract}
                    />
                ))}
            {viewStyle && <div style={{height: "220px"}}/>}
        </div>
    );
};

export default ContractCardList;
