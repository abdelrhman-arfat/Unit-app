import { documentation, quiz, task, user } from "@prisma/client";
import { CLIENT_URL } from "../../constants/ENV.js";
export const generateDocsMessage = (user: user, docs: documentation) => {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; background: #fff; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); overflow: hidden;">
          <tr>
            <td style="padding: 32px; text-align: center;">
              <h2 style="font-size: 26px; color: #1f2937;">📄 مستند جديد: ${docs.title}</h2>
              <p style="font-size: 16px; color: #6b7280; margin: 12px 0;">
                تم نشر مستند جديد مخصص لك بناءً على صفك وتخصصك.
              </p>
              <p style="font-size: 16px; color: #374151;">
                الصف: <strong>${user.grade}</strong> | التخصص: <strong>${user.specialization}</strong>
              </p>
              <a href="${docs.link}" style="margin-top: 24px; display: inline-block; background-color: #4f46e5; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 16px;">
                📥 عرض المستند الآن
              </a>
              <p style="margin-top: 40px; font-size: 14px; color: #9ca3af;">مع تحيات فريق <strong>Unit</strong> 👋</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
};

export const generateQuizMessage = (user: user, quiz: quiz) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
          <tr>
            <td style="padding: 32px; text-align: center;">
              <h2 style="font-size: 26px; color: #1f2937;">📝 اختبار جديد: ${quiz.title}</h2>
              <p style="font-size: 16px; color: #6b7280;">تمت إضافة اختبار جديد مخصص لك 🎯</p>
              <p style="font-size: 16px; color: #4b5563; margin: 16px 0;">
                الصف: <strong>${user.grade}</strong> | التخصص: <strong>${user.specialization}</strong>
              </p>
              <p style="font-size: 15px; color: #374151;">
                ⏳ المدة: <strong>${quiz.duration} دقيقة</strong><br/>
                📅 البداية: <strong>${new Date(quiz.startDate).toLocaleString("ar-EG")}</strong>
              </p>
              <a href="${CLIENT_URL}" style="display: inline-block; margin-top: 24px; background-color: #16a34a; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 16px;">
                🚀 بدء الاختبار
              </a>
              <p style="margin-top: 40px; font-size: 14px; color: #9ca3af;">مع تحيات فريق <strong>Unit</strong> ✅</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
};

export const generateTaskMessage = (user: user, task: task) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
    <tr>
      <td align="center">
        <table style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 6px 18px rgba(0,0,0,0.07);">
          <tr>
            <td style="padding: 32px; text-align: center;">
              <h2 style="font-size: 26px; color: #1f2937;">📌 مهمة جديدة: ${task.title}</h2>
              <p style="font-size: 16px; color: #6b7280;">تم تعيين مهمة جديدة لك ✍️</p>
              <p style="font-size: 15px; color: #374151;">
                📅 الموعد النهائي للتسليم: <strong>${new Date(task.endDate).toLocaleDateString("ar-EG")}</strong>
              </p>
              <p style="margin-top: 40px; font-size: 14px; color: #9ca3af;">مع تحيات فريق <strong>Unit</strong> 📚</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
};

export const sendHelloToUser = (user: user) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
    <tr>
      <td align="center">
        <table style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 6px 18px rgba(0,0,0,0.06);">
          <tr>
            <td style="padding: 32px; text-align: center;">
              <h2 style="font-size: 26px; color: #1f2937;">👋 مرحباً ${user.name}!</h2>
              <p style="font-size: 16px; color: #4b5563; margin: 16px 0;">
                يسعدنا انضمامك إلينا في منصة <strong>Unit</strong> 🎉<br/>
                نحن هنا لمساعدتك على تحقيق أهدافك التعليمية بكل سهولة!
              </p>
              <a href="${CLIENT_URL}" style="display: inline-block; margin-top: 24px; background-color: #4f46e5; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 16px;">
                🚀 استكشاف المنصة
              </a>
              <p style="margin-top: 32px; font-size: 14px; color: #9ca3af;">
                شكراً لانضمامك لنا 💚
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
};
