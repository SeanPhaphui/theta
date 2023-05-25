import React from "react";
import { ContractObject } from "../Contract/Contract";
import "./ContractCards.css";
import SingleContractCard from "./SingleContractCard/SingleContractCard";

interface ContractCardsProps {
    contracts: ContractObject[];
}

const ContractCards: React.FC<ContractCardsProps> = (props) => {
    const { contracts } = props;

    return (
        <div className="ContractCards">
            {contracts &&
                contracts.map((contract, index) => {
                    return (
                        <SingleContractCard contract={contract} key={index}/>
                    );
                })}
        </div>
    );
};

export default ContractCards;
