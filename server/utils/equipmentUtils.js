const updateEquipmentQuantity = (equipmentArray, id, quantity, oper) => {
    return equipmentArray.map(equipment => {
      if (equipment.id === id) {
        if (oper !== 'add' && equipment.available - quantity < 0) {
          return
        }
        return {
          ...equipment,
          available: oper === 'add' ? equipment.available + quantity : equipment.available - quantity
        }
      }
      return equipment;
    })
  }

module.exports = {
    updateEquipmentQuantity
}