
if (typeof gaplugin !== undefined) {
  if (typeof gaplugin.EC == "function") {
    console.log('bingo')
  } else {
    console.log('no ecommerce plugin in GA')
  }
   
} else {
  console.log('no GA plugins')
}
