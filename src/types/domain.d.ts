declare namespace Entities {
  type Medication = import('./medication').Medication;
  type Notion = import('./notion').Notion;
  type NoticeSection = import('./notice-section').NoticeSection;

  export { Medication, Notion, NoticeSection };
}
