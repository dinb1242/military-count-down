import { Injectable } from '@nestjs/common';
import { DateTimeFormatter, LocalDate, LocalDateTime, LocalTime } from 'js-joda';

@Injectable()
export class TimeUtils {
  public static convertDateToLocalDateTime(date: Date): LocalDateTime {
    const localDate = this.getLocalDate(date);
    const localTime = this.getLocalTime(date);
    return LocalDateTime.of(localDate, localTime);
  }

  public static convertDateToLocalDateTimeStr(date: Date): string {
    const localDate = this.getLocalDate(date);
    const localTime = this.getLocalTime(date);
    const localDateTime = LocalDateTime.of(localDate, localTime);

    return localDateTime.format(DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss'));
  }

  private static getLocalDate(date: Date): LocalDate {
    return LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  private static getLocalTime(date: Date): LocalTime {
    return LocalTime.of(date.getHours(), date.getMinutes(), date.getSeconds());
  }
}
