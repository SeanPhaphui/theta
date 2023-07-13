import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import minMax from "dayjs/plugin/minMax";
import React, { useEffect, useState } from "react";
import { ContractObject } from "../Contract/Contract";
import ContractDialog from "../ContractDialog/ContractDialog";
import { loadContractsFromLocalStorage, testContracts } from "../Utils/Utils";
import "./Home.css";

import ContractCardList from "../ContractCardList/ContractCardList";
import DataManager from "../DataManager/DataManager";
import D3ChartContainer from "./D3ChartContainer/D3ChartContainer";
import { Button, Snackbar } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

dayjs.extend(minMax);
dayjs.extend(advancedFormat);

const Home: React.FC = () => {
    const [is3D, setIs3D] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [contractId, setContractId] = useState<string>("");
    const [contracts, setContracts] = useState<ContractObject[]>(testContracts);
    const [earliestStartDate, setEarliestStartDate] = useState<Dayjs | null>(null);
    const [totalReturn, setTotalReturn] = useState<number>(0);
    const [averageMonthlyReturn, setAverageMonthlyReturn] = useState<number>(0);
    const [averageDailyReturn, setAverageDailyReturn] = useState<number>(0);

    const navigate = useNavigate();

    const navigateToStats = () => {
        // 👇️ navigate to /stats
        navigate("/stats", { state: contracts  });
    };

    useEffect(() => {
        const startDateArray = contracts.map((contract) => contract.startDate);
        const earliestDate = dayjs.min(startDateArray);
        setEarliestStartDate(earliestDate);

        const totalSellPrice: number = contracts.reduce(
            (totalReturn, contract) => {
                const returnFromContract =
                    contract.totalSellPrice - contract.totalBuyBackPrice;
                return totalReturn + returnFromContract;
            },
            0
        );
        setTotalReturn(totalSellPrice);
          // Calculate average monthly return
        if (earliestDate && contracts.length > 0) {
            const totalMonths = dayjs(contracts[0].startDate).diff(earliestDate, 'month');
            const avgMonthlyReturn = totalSellPrice / totalMonths;
            console.log("contracts[0].startDate: ", contracts[0].startDate)
            console.log("totalMonths: ", totalMonths)
            console.log("avgMonthlyReturn: ", avgMonthlyReturn)
            setAverageMonthlyReturn(avgMonthlyReturn);
        }
        // Calculate average monthly return
        if (earliestDate && contracts.length > 0) {
            const totalDays = dayjs(contracts[0].startDate).diff(earliestDate, 'day');
            const avgDailyReturn = totalSellPrice / totalDays;
            console.log("contracts[0].startDate: ", contracts[0].startDate)
            console.log("totalDays: ", totalDays)
            console.log("avgDailyReturn: ", avgDailyReturn)
            setAverageDailyReturn(avgDailyReturn);
        }
    }, [contracts]);

    function contractsHandler(contract: ContractObject): void {
        console.log("ADD MORE CONTRACTS");
        setContracts((prevArray) => [contract, ...prevArray]);
        setContractId(contract.id);
        setOpen(true);
    }

    const updateContract = (updatedContract: ContractObject) => {
        const updatedContracts = contracts.map((contract) => {
            if (contract.id === updatedContract.id) {
                return updatedContract;
            }
            return contract;
        });
        setContracts(updatedContracts);
        console.log(updatedContracts);
    };

    const deleteContract = (id: string) => {
        const updatedContracts = contracts.filter((contract) => contract.id !== id);
        setContracts(updatedContracts);
        console.log(updatedContracts);
    };

    useEffect(() => {
        const ContractCardList = document.querySelectorAll<HTMLElement>(".ContractCardList");
        ContractCardList.forEach((cardBlock) => {
            
            Array.from(cardBlock.children).forEach((card, i) => {
                const zIndex = cardBlock.children.length - i;
                (card as HTMLElement).style.transform = `translateY(${i}px)`;
                (card as HTMLElement).style.zIndex = `${zIndex}`;
                (card as HTMLElement).style.bottom = `${Math.min(cardBlock.children.length +2, 75)}px`;
            });
        });
        if (is3D) {
            const contractCards = document.querySelectorAll('.ContractCard3D');
    
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('flattened');
                    } else {
                        entry.target.classList.remove('flattened');
                    }
                });
            }, { 
                rootMargin: '1000% 0px -35% 0px', // Adjust as per your need.  GOOD FOR OG
                threshold: 0.1 
            }); 
        
            contractCards.forEach(card => {
                observer.observe(card);
            });
        
            return () => {
                contractCards.forEach(card => {
                    observer.unobserve(card);
                });
            };
        }
    }, [contracts, is3D]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleUndo = () => {
        const updatedContracts = contracts.filter((contract) => contract.id !== contractId);
        setContracts(updatedContracts);
        console.log(updatedContracts);
        setOpen(false);
    };

    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleUndo}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    const toggleView = () => setIs3D(!is3D);

    // Then, in a useEffect hook, you can load the value from localStorage
    // when the component first mounts.
    useEffect(() => {
        const loadedContracts = loadContractsFromLocalStorage();
        if (loadedContracts) {
            setContracts(loadedContracts);
        }
    }, []);

    // You can also use another useEffect to save the value to localStorage
    // whenever it changes.   
    useEffect(() => {
        localStorage.setItem('Contracts', JSON.stringify(contracts));
    }, [contracts]);
    
    return (
        <div className="Home">
            <DataManager
                contracts={contracts}
                restoreContracts={(contracts) => setContracts(contracts)}
                clearContracts={() => setContracts([])}
            />
            <button onClick={toggleView}>
                {is3D ? "3D Cards" : "2D Cards"}
            </button>
            <button onClick={navigateToStats}>
                View Stats
            </button>
            <div className="title">Total Return</div>
            <div className="title">{"since " + earliestStartDate?.format("MMMM Do")}</div>
            <div className="title">{"$" + totalReturn.toLocaleString()}</div>
            <D3ChartContainer data={contracts} />
            <ContractDialog onAddConract={contractsHandler} />
            {contracts && <ContractCardList contracts={contracts} updateContract={updateContract} deleteContract={deleteContract} viewStyle={is3D}/>}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Contract added"
                action={action}
            />
        </div>
    );
};

export default Home;
