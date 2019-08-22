package com.common.util;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.json.JSONException;
import org.json.JSONObject;

public class CallScriptUtil {
	/**
	 * @param engineFactorie
	 *            EngineFactories[nashorn, Nashorn, js, JS, JavaScript, javascript, ECMAScript, ecmascript]
	 * @param url
	 *            js路径
	 * @param funcName
	 *            js方法名
	 * @param params
	 *            参数
	 * @return
	 */
	
	public static JSONObject callJavaScript(String engineFactorie, String url, String funcName, Object... params) {
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName(engineFactorie);
		JSONObject jsonObj = null;
		String jsFileName = url;
		FileReader reader;
		try {
			reader = new FileReader(jsFileName);
			engine.eval(reader);
			if (engine instanceof Invocable) {
				Invocable invoke = (Invocable) engine;
				String jsonStr = (String) invoke.invokeFunction(funcName, params);
				jsonObj = new JSONObject(jsonStr);
			}
			reader.close();
		} catch (ScriptException | NoSuchMethodException | JSONException | IOException e) {
			e.printStackTrace();
		}
		return jsonObj;
	}
	
	public static JSONObject callAssociatedJavaScript(String engineFactorie, List<String> urls, String funcName, Object... params) {
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName(engineFactorie);
		List<FileReader> readers = new ArrayList<FileReader>();
		JSONObject jsonObj = null;
		if(null != urls){
			try {
				for(String url : urls){
					FileReader reader = new FileReader(url);
					readers.add(reader);
					engine.eval(reader);
				}
				if (engine instanceof Invocable) {
					Invocable invoke = (Invocable) engine;
					String jsonStr = (String) invoke.invokeFunction(funcName, params);
					jsonObj = new JSONObject(jsonStr);
				}
				for(FileReader reader: readers){
					reader.close();
				}
			} catch (ScriptException | NoSuchMethodException | JSONException | IOException e) {
				e.printStackTrace();
			}
		}
		return jsonObj;
	}
	
}