import React from "react";
import { ContractObject } from "../Contract/Contract";
import "./ContractCardList.css";
import ContractCardContainer from "./ContractCardContainer/ContractCardContainer";

interface ContractCardsProps {
    contracts: ContractObject[];
    updateTotalBuyBackPrice: (id: string, newPrice: number) => void;
}

const ContractCardList: React.FC<ContractCardsProps> = (props) => {
    const { contracts, updateTotalBuyBackPrice } = props;

    return (
        <div className="ContractCardList">
            {contracts &&
                contracts.map((contract) => {
                    return (
                        <ContractCardContainer contract={contract} key={contract.id} updateTotalBuyBackPrice={updateTotalBuyBackPrice}/>
                    );
                })}
        </div>
    );
};

export default ContractCardList;
