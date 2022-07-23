import { protocolParameters } from "./protocol_parameters.mjs";
import { InitTx } from "./Utils.js";
import Loader from "./loader.mjs";

const tamahaganeAddress =
  "addr_test1qzpw3qd6l3xyu6l46d6rgrp4emq5x68g589029z2ty3crgk7edsdfc2n5rhvl2hmn498cwd67803mm9u2ktxcgjhj9msavfpz0";

export default async function sendAda(senderAddress, utxosbytes) {
  await Loader.load();
  const wasm = Loader.Cardano;

  const reciverAddress = wasm.Address.from_bech32(tamahaganeAddress);

  const wasmSender = wasm.Address.from_bytes(Buffer.from(senderAddress, "hex"));
  const outPutValue = wasm.Value.new(wasm.BigNum.from_str(`${20 * 10 ** 6}`));

  const output = wasm.TransactionOutput.new(reciverAddress, outPutValue);

  const txBuilder = InitTx(wasm, protocolParameters);

  txBuilder.add_output(output);
  const utoxs_ = utxosbytes.map((x) =>
    wasm.TransactionUnspentOutput.from_bytes(Buffer.from(x, "hex"))
  );
  const utxos = wasm.TransactionUnspentOutputs.new();
  utoxs_.forEach((utxo) => utxos.add(utxo));
  txBuilder.add_inputs_from(utxos, 3);
  txBuilder.add_change_if_needed(wasmSender);
  const txBody = txBuilder.build_tx();
  console.log(Buffer.from(txBody.to_bytes()).toString("hex"));
  return Buffer.from(txBody.to_bytes()).toString("hex");
}
