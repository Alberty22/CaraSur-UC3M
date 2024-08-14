const updateEquipmentQuantity = async (equipmentArray, ids, quantities, oper) => {

  if (ids.length !== quantities.length) {
    throw new Error('IDs and quantities arrays must have the same length')
  }

  return equipmentArray.map(equipment => {

    const index = ids.indexOf(equipment.id)
    
    if (index !== -1) {
      const quantity = quantities[index]
      
      if (oper !== 'add' && equipment.available - quantity < 0) {
        return equipment
      }

      return {
        ...equipment,
        available: oper === 'add' ? equipment.available + quantity : equipment.available - quantity
      }
    }
    
    return equipment
  })
}

module.exports = {
    updateEquipmentQuantity
}