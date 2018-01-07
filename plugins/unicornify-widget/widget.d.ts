/**
 * Created by glenn on 22.12.17.
 */

declare namespace c8y {
  export interface WidgetDataFilter {
    source?: string | { id: string };
    type?: string;
    fragmentType?: string;
    dateFrom?: string | Date;
    dateTo?: string | Date;
  }
}
