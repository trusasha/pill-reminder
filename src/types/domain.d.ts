declare namespace Entities {
  type Medication = import('../entities/medication').Medication;
  type Notion = import('../entities/notion').Notion;
  type NoticeSection = import('../entities/notice-section').NoticeSection;

  export { Medication, Notion, NoticeSection };
}
