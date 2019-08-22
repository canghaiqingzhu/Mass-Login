package com.common.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

public class Dt {
	/** 时间戳精确到毫秒 **/
	public static String getTimeSSS() {
		return DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
	}

	public static long compareTimeToSecond(Date t1, Date t2) {
		long time = t1.getTime() - t2.getTime();
		return time / 1000;
	}

	public static String formatDateTime(String ymd, Date datetime) {
		SimpleDateFormat isNow = new SimpleDateFormat(ymd);
		String now = "";
		try {
			now = isNow.format(datetime);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return now;
	}

	public static Date format(String s, String f) {
		SimpleDateFormat format = new SimpleDateFormat(f);
		try {
			return format.parse(s);
		} catch (Exception e) {
			e.printStackTrace();
			return new Date();
		}
	}

	/** 格式化为日期格式:yyyy-MM-dd **/
	public static String format(Date d) {
		return DateFormatUtils.format(d, DateFormatUtils.ISO_8601_EXTENDED_DATE_FORMAT.getPattern());
	}

	/** 格式化为时间格式:yyyy-MM-dd'T'HH:mm:ss **/
	public static String formatDate(Date d) {
		return DateFormatUtils.format(d, DateFormatUtils.ISO_8601_EXTENDED_DATETIME_FORMAT.getPattern());
	}

	/** 格式化为时间格式:HH:mm:ss **/
	public static String formatTime(Date d) {
		return DateFormatUtils.format(d, DateFormatUtils.ISO_8601_EXTENDED_TIME_FORMAT.getPattern());
	}

	/** 格式化时间 **/
	public static String format(Date d, String p) {
		return DateFormatUtils.format(d, p);
	}

	/** 是否同一天 **/
	public static boolean isSameDay(Date d1, Date d2) {
		return DateUtils.isSameDay(d1, d2);
	}

	/** 是否同一天 **/
	public static boolean isSameDay(Calendar c1, Calendar c2) {
		return DateUtils.isSameDay(c1, c2);
	}

	public static long getYear(Date d) {
		return getCalendar(d).get(Calendar.YEAR);
	}

	public static long getMonth(Date d) {
		return getCalendar(d).get(Calendar.MONTH) + 1;
	}

	public static long getDay(Date d) {
		return getCalendar(d).get(Calendar.DAY_OF_MONTH);
	}

	public static long getHour(Date d) {
		return getCalendar(d).get(Calendar.HOUR_OF_DAY);
	}

	public static long getMinute(Date d) {
		return getCalendar(d).get(Calendar.MINUTE);
	}

	public static Calendar getCalendar(Date d) {
		return DateUtils.toCalendar(d, TimeZone.getDefault());
	}

	public static Date addYear(Date d, int i) {
		return DateUtils.addYears(d, i);
	}

	public static Date addMonth(Date d, int i) {
		return DateUtils.addMonths(d, i);
	}

	public static Date addWeek(Date d, int i) {
		return DateUtils.addWeeks(d, i);
	}

	public static Date addDay(Date d, int i) {
		return DateUtils.addDays(d, i);
	}

	public static Date addHour(Date d, int i) {
		return DateUtils.addHours(d, i);
	}

	public static Date addMinute(Date d, int i) {
		return DateUtils.addMinutes(d, i);
	}

	public static Date addSeconds(Date d, int i) {
		return DateUtils.addSeconds(d, i);
	}

	/** 返回当年最小时间 **/
	public static Date forThisYear(Date d) {
		return DateUtils.truncate(d, Calendar.YEAR);
	}

	/** 返回当月最小时间 **/
	public static Date forThisMonth(Date d) {
		return DateUtils.truncate(d, Calendar.MONTH);
	}

	/** 返回当天最小时间 **/
	public static Date forThisDay(Date d) {
		return DateUtils.truncate(d, Calendar.DATE);
	}

	/** 返回当前小时最小时间 **/
	public static Date forThisHour(Date d) {
		return DateUtils.truncate(d, Calendar.HOUR);
	}

	/** 返回当前分钟最小时间 **/
	public static Date forThisMinute(Date d) {
		return DateUtils.truncate(d, Calendar.MINUTE);
	}

	/** 返回当前秒最小时间 **/
	public static Date forThisSecond(Date d) {
		return DateUtils.truncate(d, Calendar.SECOND);
	}

	/** 返回下一年最小时间 **/
	public static Date forNextYear(Date d) {
		return DateUtils.ceiling(d, Calendar.YEAR);
	}

	/** 返回下一月最小时间 **/
	public static Date forNextMonth(Date d) {
		return DateUtils.ceiling(d, Calendar.MONTH);
	}

	/** 返回下一天最小时间 **/
	public static Date forNextDay(Date d) {
		return DateUtils.ceiling(d, Calendar.DATE);
	}

	/** 返回下一小时最小时间 **/
	public static Date forNextHour(Date d) {
		return DateUtils.ceiling(d, Calendar.HOUR);
	}

	/** 返回下一分钟最小时间 **/
	public static Date forNextMinute(Date d) {
		return DateUtils.ceiling(d, Calendar.MINUTE);
	}

	public static String compareTimeToStr(Date time1, Date time2) {
		long time = time1.getTime() - time2.getTime();
		long day = time / (24 * 60 * 60 * 1000);
		time = time - (24 * 60 * 60 * 1000) * day;
		long hour = time / (60 * 60 * 1000);
		time = time - (60 * 60 * 1000) * hour;
		long minute = time / (60 * 1000);
		time = time - (60 * 1000) * minute;
		long second = time / 1000;
		return "" + day + "天" + hour + "时" + minute + "分" + second + "秒";
	}

	public static Date initDateInfo(int year, int month, int day) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month - 1);
		cal.set(Calendar.DATE, day);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}

	public static Date strToDate(String dateStr) {
		Date date = null;
		if (St.notEmpty(dateStr)) {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), shortDf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				if (dateStr.indexOf(":") > 0)
					date = df.parse(dateStr);
				else
					date = shortDf.parse(dateStr);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return date;
	}

	public static long compareTimeReturnDay(Date start, Date end) {
		long time = end.getTime() - start.getTime();
		long day = 0;
		if (time > 0) {
			day = time / (24 * 60 * 60 * 1000);
		} else {
			day = -time / (24 * 60 * 60 * 1000);
		}
		return day;
	}

	public static long[] getDistanceTimes(Date startDate, Date endDate) {
		long day = 0, hour = 0, min = 0, sec = 0;
		long time1 = startDate.getTime();
		long time2 = endDate.getTime();
		long diff;
		if (time1 < time2) {
			diff = time2 - time1;
		} else {
			diff = time1 - time2;
		}
		day = diff / (24 * 60 * 60 * 1000);
		hour = (diff / (60 * 60 * 1000) - day * 24);
		min = ((diff / (60 * 1000)) - day * 24 * 60 - hour * 60);
		sec = (diff / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
		long[] times = { day, hour, min, sec };
		return times;
	}
}