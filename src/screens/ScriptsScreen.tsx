import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Copy, Clipboard, Play, Trash2, XCircle } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from '../components/GlassCard';

interface LogEntry {
  id: string;
  time: string;
  text: string;
  type?: 'info' | 'success' | 'warn' | 'exec';
}

const SAMPLE_LUA_SCRIPT = `-- YIy注入 Roblox 自定义 Lua 扩展
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

print("[YIy] 初始化神速与无敌挂载...")
LocalPlayer.Character.Humanoid.WalkSpeed = 64
LocalPlayer.Character.Humanoid.JumpPower = 120
print("[YIy] 脚本注入成功，参数已生效！")`;

export const ScriptsScreen: React.FC = () => {
  const { activeColor, isDark } = useTheme();
  const [scriptText, setScriptText] = useState<string>(SAMPLE_LUA_SCRIPT);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', time: '12:00:01', text: '系统初始化完成...', type: 'info' },
    { id: '2', time: '12:00:02', text: '等待注入指令...', type: 'info' },
    { id: '3', time: '12:00:03', text: 'WindowManager 悬浮窗权限已获取', type: 'success' },
  ]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'exec' = 'info') => {
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      time: getCurrentTime(),
      text,
      type,
    };
    setLogs((prev) => [...prev, newEntry]);
  };

  const handleClearScript = () => {
    setScriptText('');
    addLog('[Clear] 已清空输入框文本', 'warn');
  };

  const handleCopy = () => {
    addLog(`[Copy] 脚本文本已复制 (字数: ${scriptText.length})`, 'info');
  };

  const handlePaste = () => {
    setScriptText(SAMPLE_LUA_SCRIPT);
    addLog('[Paste] 已成功粘贴示例 Roblox Lua 脚本', 'info');
  };

  const handleRun = () => {
    if (!scriptText.trim()) {
      addLog('[Error] 脚本文本为空，无法执行', 'warn');
      return;
    }

    addLog('[Exec] 正在解析与编译自定义脚本...', 'exec');
    setTimeout(() => {
      addLog('[Exec] 正在挂载代码至游戏主线程...', 'exec');
    }, 300);
    setTimeout(() => {
      addLog('[Success] 脚本执行成功！Hook 接口生效中', 'success');
    }, 600);
  };

  const handleClearLogs = () => {
    setLogs([
      { id: Date.now().toString(), time: getCurrentTime(), text: '日志已清空', type: 'info' },
    ]);
  };

  return (
    <SafeAreaView style={styles.flex1} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* 页头标题 */}
        <View style={styles.headerBox}>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            注入
          </Text>
          <Text style={[styles.headerSub, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)' }]}>
            自定义 Lua / JS 脚本编写、一键挂载与控制台日志
          </Text>
        </View>

        {/* TextInput 输入框 + 清空按钮 */}
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: isDark
                ? 'rgba(255, 255, 255, 0.22)'
                : 'rgba(0, 0, 0, 0.1)',
              backgroundColor: isDark
                ? 'rgba(10, 15, 28, 0.65)'
                : 'rgba(255, 255, 255, 0.8)',
            },
          ]}
        >
          <View style={styles.inputHeaderBar}>
            <Text style={[styles.inputLabel, { color: activeColor.hex }]}>
              Lua / JS 脚本文本编辑
            </Text>
            <Pressable onPress={handleClearScript} style={styles.clearBtn}>
              <XCircle size={14} color="#F43F5E" />
              <Text style={styles.clearBtnText}>清空</Text>
            </Pressable>
          </View>

          <TextInput
            multiline
            value={scriptText}
            onChangeText={setScriptText}
            placeholder="在此输入或粘贴 Lua / JS 脚本文本..."
            placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
            style={[
              styles.textArea,
              { color: isDark ? '#38BDF8' : '#0284C7' },
            ]}
          />
        </View>

        {/* Action Row: Copy, Paste, Run */}
        <View style={styles.actionRow}>
          <Pressable
            onPress={handleCopy}
            style={[
              styles.actionBtn,
              {
                borderColor: isDark
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.1)',
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.7)',
              },
            ]}
          >
            <Copy size={14} color={isDark ? '#E2E8F0' : '#1E293B'} />
            <Text style={[styles.actionBtnText, { color: isDark ? '#E2E8F0' : '#1E293B' }]}>
              复制
            </Text>
          </Pressable>

          <Pressable
            onPress={handlePaste}
            style={[
              styles.actionBtn,
              {
                borderColor: isDark
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.1)',
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.7)',
              },
            ]}
          >
            <Clipboard size={14} color={isDark ? '#E2E8F0' : '#1E293B'} />
            <Text style={[styles.actionBtnText, { color: isDark ? '#E2E8F0' : '#1E293B' }]}>
              粘贴
            </Text>
          </Pressable>

          <Pressable
            onPress={handleRun}
            style={[
              styles.actionBtn,
              styles.runBtn,
              {
                backgroundColor: activeColor.hex,
                borderColor: activeColor.hex,
              },
            ]}
          >
            <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={[styles.actionBtnText, { color: '#FFFFFF', fontWeight: '800' }]}>
              运行
            </Text>
          </Pressable>
        </View>

        {/* Logs Panel */}
        <View
          style={[
            styles.logPanel,
            {
              borderColor: isDark
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(0, 0, 0, 0.08)',
              backgroundColor: isDark
                ? 'rgba(6, 9, 18, 0.85)'
                : 'rgba(255, 255, 255, 0.85)',
            },
          ]}
        >
          <View style={styles.logHeader}>
            <Text style={[styles.logTitle, { color: isDark ? '#F1F5F9' : '#0F172A' }]}>
              控制台日志 (Logs)
            </Text>
            <Pressable onPress={handleClearLogs} style={styles.logClearBtn}>
              <Trash2 size={12} color={isDark ? '#94A3B8' : '#64748B'} />
              <Text style={[styles.logClearText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                清空日志
              </Text>
            </Pressable>
          </View>

          <ScrollView style={styles.logTerminal} showsVerticalScrollIndicator={false}>
            {logs.map((log) => (
              <View key={log.id} style={styles.logRow}>
                <Text style={styles.logTime}>[{log.time}]</Text>
                <Text
                  style={[
                    styles.logText,
                    log.type === 'success' && styles.textSuccess,
                    log.type === 'warn' && styles.textWarn,
                    log.type === 'exec' && { color: activeColor.hex },
                  ]}
                >
                  {log.text}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
  },
  headerBox: {
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
  },
  headerSub: {
    fontSize: 12,
    marginTop: 2,
  },
  inputContainer: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 12,
    height: 180,
  },
  inputHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
  },
  clearBtnText: {
    fontSize: 11,
    color: '#F43F5E',
    fontWeight: '700',
  },
  textArea: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 13,
    textAlignVertical: 'top',
    padding: 0,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 14,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    gap: 6,
  },
  runBtn: {
    flex: 1.2,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  logPanel: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 12,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  logTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  logClearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logClearText: {
    fontSize: 11,
    fontWeight: '600',
  },
  logTerminal: {
    flex: 1,
    marginTop: 8,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginVertical: 3,
  },
  logTime: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#64748B',
  },
  logText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#94A3B8',
    flex: 1,
  },
  textSuccess: {
    color: '#10B981',
  },
  textWarn: {
    color: '#F59E0B',
  },
});
