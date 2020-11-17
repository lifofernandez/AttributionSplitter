
const hre = require("hardhat");

async function main() {

  const tenedores = 3
  
  // We get the contract to fetch
  const AS = await hre.ethers.getContractFactory(
    "AttributionSplitter"
  );
  
  //const attributionsplitter = await AttributionSplitter.deploy(
  //  tenedores,
  //  partes
  //);

  const as = await AS.attach(
    "0x11fBE98355090aed6b4c9B0b7047A7900CC862bA"
  )
  console.log(
    "AttSplit fetched from:\n",
     as.address
  );

  for ( var i = 0; i < tenedores; i++ )  {
    const p = await as.payee(i);
    await as.release(p);
    const soltado = await as.released(p);
    console.log( "Payee:", p );
    console.log( "Soltado:", soltado.toString() );
  };

  const totalReleased = await as.totalReleased();
  console.log("Total Released:", totalReleased.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
