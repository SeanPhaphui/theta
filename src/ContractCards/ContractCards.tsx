import React from "react";
import { ContractObject } from "../Contract/Contract";
import "./ContractCards.css";
import SingleContractCard from "./SingleContractCard/SingleContractCard";

interface ContractCardsProps {
    contracts: ContractObject[];
}

const ContractCards: React.FC<ContractCardsProps> = (props) => {
    const { contracts } = props;
    console.log("Contracts Card")

    return (
        <div className="ContractCards">
            {contracts &&
                contracts.map((contract) => {
                    return (
                        <SingleContractCard contract={contract} key={contract.id}/>
                    );
                })}
        </div>
    );
};

export default ContractCards;
