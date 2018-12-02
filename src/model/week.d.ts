interface Week {
  name?: string,
  surname?: string,
  beruf?: string,
  hSum?: string,
  id?: number,
  nr?: number,
  department: string,
  year?: number,
  startDate?: string,
  endDate?: string,
  date?: Date,

  weekdays: Weekday[];

  hMo?: number,
  hDi?: number,
  hMi?: number,
  hDo?: number,
  hFr?: number,


  contentMo1?: string,
  contentMo2?: string,
  contentMo3?: string,
  contentMo4?: string,
  contentMo5?: string,
  contentMo6?: string,
  contentMo7?: string,
  contentMo8?: string,

  contentDi1?: string,
  contentDi2?: string,
  contentDi3?: string,
  contentDi4?: string,
  contentDi5?: string,
  contentDi6?: string,
  contentDi7?: string,
  contentDi8?: string,

  contentMi1?: string,
  contentMi2?: string,
  contentMi3?: string,
  contentMi4?: string,
  contentMi5?: string,
  contentMi6?: string,
  contentMi7?: string,
  contentMi8?: string,

  contentDo1?: string,
  contentDo2?: string,
  contentDo3?: string,
  contentDo4?: string,
  contentDo5?: string,
  contentDo6?: string,
  contentDo7?: string,
  contentDo8?: string,

  contentFr1?: string,
  contentFr2?: string,
  contentFr3?: string,
  contentFr4?: string,
  contentFr5?: string,
  contentFr6?: string,
  contentFr7?: string,
  contentFr8?: string,
}