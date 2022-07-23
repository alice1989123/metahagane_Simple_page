import loader from "./loader.mjs";

export const fullfillTransaction = async (txBody, witness) => {
  await loader.load();
  const Cardano = loader.Cardano;
  const tx = Cardano.Transaction.from_bytes(Buffer.from(txBody, "hex"));
  const sigs = Cardano.TransactionWitnessSet.from_bytes(
    Buffer.from(witness, "hex")
  );

  const witnessSet = tx.witness_set();
  witnessSet.set_vkeys(sigs.vkeys());

  const signedTx = Cardano.Transaction.new(
    tx.body(),
    witnessSet,
    tx.auxiliary_data()
  );
  const finalTxBody = Buffer.from(signedTx.to_bytes()).toString("hex");
  return finalTxBody;
};

export function InitTx(wasm, protocolParameters) {
  console.log(protocolParameters);

  let tbcb = wasm.TransactionBuilderConfigBuilder.new();
  tbcb = tbcb.fee_algo(
    wasm.LinearFee.new(
      wasm.BigNum.from_str(`${protocolParameters.min_fee_a}`),
      wasm.BigNum.from_str(`${protocolParameters.min_fee_b}`)
    )
  );

  tbcb = tbcb.pool_deposit(
    wasm.BigNum.from_str(`${protocolParameters.pool_deposit}`)
  );

  tbcb = tbcb.key_deposit(
    wasm.BigNum.from_str(String(protocolParameters.key_deposit))
  );

  tbcb = tbcb.max_value_size(String(protocolParameters.max_val_size));

  tbcb = tbcb.max_tx_size(String(protocolParameters.max_tx_size));
  tbcb = tbcb.coins_per_utxo_word(
    wasm.BigNum.from_str(String(protocolParameters.coins_per_utxo_word))
  );

  const tbc = tbcb.build();
  const txBuilder = wasm.TransactionBuilder.new(tbc);
  return txBuilder;
}
