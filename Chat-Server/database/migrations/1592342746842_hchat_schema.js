'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HchatSchema extends Schema {
  up () {
    this.create('hchats', (table) => {
      table.increments()
      table.string('Historial', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('hchats')
  }
}

module.exports = HchatSchema
