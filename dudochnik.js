
if (typeof gaplugins !== undefined) {
  if (typeof gaplugins.EC == "function") {
    console.log('bingo')
  } else {
    console.log('no ecommerce plugin in GA')
  }
   
} else {
  console.log('no GA plugins')
}
