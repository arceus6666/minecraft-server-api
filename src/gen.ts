// const fs = require('fs');
// const { exit } = require('yargs');
import fs from 'fs';
import * as yargs from 'yargs';
import { exit } from 'yargs';


/* NOTE:
Allowed symbols
!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»
*/
const symbols: Array<string> = `!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»`.split('');

const allowSymbol = (symbol: string) => {
  if (symbol in symbols) return symbol;
  return '$';
};

const argv = yargs
  .command('generate', 'Generate signs', {
    itemid: {
      demand: true,
      alias: 'i',
      desc: 'ItemID'
    },
    name: {
      demand: true,
      alias: 'n',
      desc: 'Item name'
    },
    buy: {
      demand: true,
      alias: 'b',
      desc: 'Buy Price'
    },
    sell: {
      default: 0,
      alias: 's',
      desc: 'Sell Price'
    },
    quantity: {
      default: 1,
      alias: 'q',
      desc: 'Quantity'
    },
    buysign: {
      default: 'minecraft:crimson_sign',
      alias: 'bs',
      desc: 'Sign type id'
    },
    sellsign: {
      default: 'minecraft:warped_sign',
      alias: 'ss',
      desc: 'Sign type id'
    },
    currency: {
      default: '$',
      alias: 'c',
      desc: 'Currency Symbol'
    }
  }).command('init', 'Init sign', {
    signid: {
      default: 'minecraft:oak_sign',
      alias: 't',
      desc: 'Sign type id'
    }, currency: {
      default: 'ø',
      alias: 'c',
      desc: 'Currency Symbol'
    }
  }).help().argv;

const buy = (item_id: string, sign_id: string, price: number, name: string, quantity: string, currency: string) => `/give @p ${sign_id}{"BlockEntityTag":{"Text1":"{\\\"text\\\":\\\"[Buy]\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"tellraw @p[distance=..5, scores={Money=..${price - 1}}] [{\\\\\\\"text\\\\\\\":\\\\\\\"You don't have enough money to buy ${quantity} ${name}, it costs ${allowSymbol(currency)}${price}\\\\\\\", \\\\\\\"color\\\\\\\":\\\\\\\"red\\\\\\\"}]\\\"}}","Text2":"{\\\"text\\\":\\\"${name}\\\"}}","Text3":"{\\\"text\\\":\\\"${allowSymbol(currency)}${price}\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"give @p[distance=..5, scores={Money=${price}..}] ${item_id} ${quantity}\\\"},\\\"color\\\":\\\"green\\\"}","Text4":"{\\\"text\\\":\\\"QTY: ${quantity}\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"scoreboard players remove @p[distance=..5, scores={Money=${price}..}] Money ${price}\\\"},\\\"color\\\":\\\"aqua\\\"}"},"display":{"Name":"{\\\"text\\\":\\\"Buy ${name}\\\"}"}}`;

const sell = (item_id: string, sign_id: string, price: number, name: string, quantity: string, currency: string) => `/give @p ${sign_id}{"BlockEntityTag":{"Text1":"{\\\"text\\\":\\\"[Sell]\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"execute as @p[distance=..5] store result score @s hasItems run clear @s ${item_id} 0\\\"}}","Text2":"{\\\"text\\\":\\\"${name}\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"clear @p[scores={hasItems=${quantity}..}] ${item_id} ${quantity}\\\"}}","Text3":"{\\\"text\\\":\\\"${allowSymbol(currency)}${price}\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"scoreboard players add @p[scores={hasItems=${quantity}..}] Money ${price}\\\"},\\\"color\\\":\\\"green\\\"}","Text4":"{\\\"text\\\":\\\"QTY: ${quantity}\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"/scoreboard players set @p hasItems 0\\\"},\\\"color\\\":\\\"aqua\\\"}"},"display":{"Name":"{\\\"text\\\":\\\"Sell ${name}\\\"}"}}`;

const init = (sign_id: string, currency: string) => `/give @p ${sign_id}{"BlockEntityTag":{"Text1":"{\\\"text\\\":\\\" \\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"scoreboard objectives add Money dummy [\\\\\\\"Money ${allowSymbol(currency)}\\\\\\\"]\\\"}}","Text2":"{\\\"text\\\":\\\"[Sign Shop]\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"scoreboard objectives setdisplay sidebar Money\\\"}}","Text3":"{\\\"text\\\":\\\"Setup Commands\\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"scoreboard objectives add hasItems dummy\\\"},\\\"color\\\":\\\"green\\\"}","Text4":"{\\\"text\\\":\\\" \\\",\\\"clickEvent\\\":{\\\"action\\\":\\\"run_command\\\",\\\"value\\\":\\\"tellraw @p [{\\\\\\\"text\\\\\\\":\\\\\\\"Done.\\\\\\\", \\\\\\\"color\\\\\\\":\\\\\\\"green\\\\\\\"}]\\\"},\\\"color\\\":\\\"aqua\\\"}"},"display":{"Name":"{\\\"text\\\":\\\"Setup Sign Shop\\\"}"}}`;

const main = async (): Promise<void> => {

  let comando = argv._[0];
  switch (comando) {
    case 'generate':
      fs.writeFileSync('./buy', buy(argv.itemid as string, argv.buysign as string, argv.buy as number, argv.name as string, argv.quantity as string, argv.currency as string));
      fs.writeFileSync('./sell', sell(argv.itemid as string, argv.sellsign as string, argv.sell as number, argv.name as string, argv.quantity as string, argv.currency as string));
      fs.appendFileSync('./prices.csv', `${argv.name};${argv.buy};${argv.sell};${argv.quantity}\n`);
      break;
    case 'init':
      fs.writeFileSync('./init', init(argv.signid as string, argv.currency as string));
      break;
  }
}

let e: Error;

main().then(() => { exit(0, e); });
