
export const loadItems = component => {
  component.loadItems()
    .then(items => { component.$emit('ready') })
}

export const loadItem = component => {
  component.loadItem(component.id)
    .then(items => { component.$emit('ready') })
}

export const deleteItem = (item, component) => {
  component.deleteItem(item.id)
    .then(() => {
      component.$notify({
        type: 'success',
        text: 'Element uspešno izbrisan.',
      })
    })
}

export const createItem = (data, component) => {
  component.createItem({ id: component.id, ...data })
    .then(item => {
      component.$notify({
        type: 'success',
        text: 'Podatki so bili uspešno shranjeni.',
      })
    })
}

export const updateItem = (data, component) => {
  component.updateItem({ id: component.id, ...data })
    .then(item => {
      component.$notify({
        type: 'success',
        text: 'Podatki so bili uspešno shranjeni.',
      })
    })
}
