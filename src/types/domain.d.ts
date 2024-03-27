declare namespace Entities {
  type Medication = import('../entities/medication').Medication;
  type Notion = import('../entities/notion').Notion;

  export { Medication, Notion };
}
