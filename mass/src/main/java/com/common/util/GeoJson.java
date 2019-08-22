package com.common.util;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import com.mongodb.BasicDBList;

public class GeoJson {
	public static Document getGeoJson(double lat, double lng) {
		List<Double> coordinates = new ArrayList<Double>();
		coordinates.add(lng);
		coordinates.add(lat);
		Document geoJson = new Document();
		geoJson.put("type", "Point");
		geoJson.put("coordinates", coordinates);
		return geoJson;
	}

	public static Document getGridGeoJson(List<Double> lat, List<Double> lng) {
		Document geoJson = new Document();
		geoJson.put("type", "Polygon");
		BasicDBList list = new BasicDBList();
		for (int i = 0; i < lat.size(); i++) {
			BasicDBList ary = new BasicDBList();
			ary.add(lng.get(i));
			ary.add(lat.get(i));
			list.add(ary);
		}
		BasicDBList last = new BasicDBList();
		last.add(lng.get(0));
		last.add(lat.get(0));
		list.add(last);
		BasicDBList coordinates = new BasicDBList();
		coordinates.add(list);
		geoJson.put("coordinates", coordinates);
		return geoJson;
	}
}