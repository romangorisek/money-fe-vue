
export const loadItems = component => {
  component.loadItems()
    .then(items => { component.asyncDataStatus_fetched() })
}

export const loadItem = component => {
  component.loadItem(component.id)
    .then(items => { component.asyncDataStatus_fetched() })
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

export const saveItem = (data, redirect, component) => {
  component.saveItem({ id: component.id, ...data })
    .then(item => {
      component.$notify({
        type: 'success',
        text: 'Podatki so bili uspešno shranjeni.',
      })
      if (redirect) {
        component.$router.push({ name: redirect })
      }
    })
}
