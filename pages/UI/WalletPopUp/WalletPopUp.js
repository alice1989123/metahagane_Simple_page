import Modal from '../Modal/Modal';
import { useEffect, useState } from 'react';
const WalletPopUp = props => {
    const [wallets, setWallets] = useState([]);
    const supportedWallets = ['eternl', 'flint', 'nami',];
    const [icons,] = useState({
        'eternl': '/assets/images/eternl.png',
        'nami': '/assets/images/nami.svg',
        'flint': '/assets/images/flint.svg'
    });

    const connectWallet = async (wallet) => {
        const walletInstance = await window?.cardano[wallet].enable();
        if (walletInstance) {
            localStorage.wallet = wallet;
        }
    }

    useEffect(() => {
        setWallets(supportedWallets.map((wallet, i) => {
            if (typeof window !== undefined) {
                return (
                    <div className="text-gray1 dark:text-white px-5 pl-2 py-2 font-bold rounded-3xl shadow-button dark:shadow-button-dark text-sm hover:shadow-button-hover cursor-pointer flex items-center gap-5 w-2/3" onClick={() => connectWallet(wallet)} key={`${wallet}+${i}`}>
                        <div className="flex items-center rounded-full p-2 shadow-button-icon dark:shadow-button-icon-dark">
                            <img src={icons[wallet]} alt={wallet} className="w-6" />
                        </div>
                        <span className="capitalize">{wallet}</span>
                    </div>
                )
            }
        }));
    }, []);

    return (
        <Modal close={props.close}>
            <div className="px-5 py-7">
                <div className="font-bold">Connect Wallet</div>
                <div className="flex flex-col w-full gap-4 items-center py-10">
                    {wallets}
                </div>
            </div>
        </Modal>
    )
}

export default WalletPopUp;