/* ===================================================
   จับผิดภาพปลา – Thai Fish Spot the Difference Game
   game.js  –  Image-based game engine v2
   =================================================== */

'use strict';

// ==================== FISH DATA ====================
const FISH_DATA = [
  {
    id: 'krai',
    name: 'ปลากราย',
    sciName: 'Chitala ornata',
    family: 'Notopteridae',
    emoji: '🐟',
    imgOrig: 'images/krai_orig.jpg',
    imgDiff: 'images/krai_diff.jpg',
    habitat: 'แม่น้ำและแหล่งน้ำจืดขนาดใหญ่ทั่วทุกภาคของไทย',
    distribution: 'ลุ่มแม่น้ำเจ้าพระยา, แม่โขง, ตาปี, แม่กลอง',
    size: 'ความยาวสูงสุด 100–120 ซม. น้ำหนักสูงสุด 8–10 กก.',
    biology: 'ปลากรายเป็นปลาในวงศ์ Notopteridae มีลักษณะลำตัวแบนข้างคล้ายมีด (knife fish) มีครีบก้นยาวเชื่อมกับหางเคลื่อนที่โดยการโบกครีบก้นเป็นคลื่น อาศัยในบริเวณน้ำนิ่งหรือกระแสน้ำช้า กินปลาขนาดเล็กและสัตว์น้ำเป็นอาหาร',
    ecology: 'เป็น keystone predator ในระบบนิเวศน้ำจืด ช่วยควบคุมประชากรปลาขนาดเล็ก มีอวัยวะรับความดันน้ำ (lateral line) ที่พัฒนาดีมากช่วยในการล่าเหยื่อในน้ำขุ่น',
    conservation: 'LC (Least Concern) – IUCN แต่ประชากรลดลงในหลายพื้นที่เนื่องจากการทำลายแหล่งอาศัย',
    economicValue: 'เป็นปลาเศรษฐกิจสำคัญ นิยมบริโภคในรูปแบบสดและแปรรูป เนื้อมีคุณภาพสูง ราคาสูงกว่าปลาทั่วไป',
    tags: ['ปลาน้ำจืด', 'Knife Fish', 'ปลาเศรษฐกิจ', 'Notopteridae'],
    funFact: 'ปลากรายสามารถว่ายน้ำถอยหลังได้อย่างคล่องแคล่วเหมือนว่ายไปข้างหน้า เนื่องจากกลไกการเคลื่อนที่ด้วยครีบก้นที่เป็นเอกลักษณ์',
    // Differences: regions in % of image (x, y, w, h) where differences exist
    // Based on what was changed: body color, spot count, eye size, dorsal fin, tail fin
    differences: [
      { id: 0, label: '🔵 สีลำตัว',   desc: 'สีลำตัวเปลี่ยนเป็นสีเขียว-น้ำเงิน',  rx: 0.12, ry: 0.20, rw: 0.75, rh: 0.60 },
      { id: 1, label: '⚫ จำนวนจุด',  desc: 'จุดดำบนลำตัวน้อยลง (7 แทน 9)',       rx: 0.44, ry: 0.42, rw: 0.46, rh: 0.28 },
      { id: 2, label: '👁 ดวงตา',      desc: 'ดวงตามีขนาดใหญ่ขึ้น',                rx: 0.06, ry: 0.46, rw: 0.15, rh: 0.18 },
      { id: 3, label: '🟠 ครีบหลัง',  desc: 'ครีบหลังมีสีส้ม-แดง',                rx: 0.48, ry: 0.24, rw: 0.18, rh: 0.20 },
      { id: 4, label: '🟡 ครีบหาง',   desc: 'ครีบหางมีสีเหลืองอ่อน',               rx: 0.70, ry: 0.35, rw: 0.26, rh: 0.48 }
    ],
    timerSeconds: { easy: 120, medium: 90, hard: 60 }
  },
  {
    id: 'chon',
    name: 'ปลาช่อน',
    sciName: 'Channa striata',
    family: 'Channidae',
    emoji: '🐠',
    imgOrig: 'images/chon_orig.jpg',
    imgDiff: 'images/chon_diff.jpg',
    habitat: 'ทุ่งนา, บึง, แม่น้ำ, คลอง ทั่วทุกภาคของไทย',
    distribution: 'พบทั่วภูมิภาคเอเชียใต้และเอเชียตะวันออกเฉียงใต้',
    size: 'ความยาวสูงสุด 90 ซม. น้ำหนักสูงสุด 3–5 กก.',
    biology: 'ปลาช่อนในวงศ์ Channidae เป็นปลาที่มีอวัยวะหายใจพิเศษ (suprabranchial organ) ทำให้หายใจอากาศได้โดยตรง สามารถอยู่บนบกได้ชั่วคราว มีฟันแหลมคมและขากรรไกรที่แข็งแรงสำหรับจับเหยื่อ',
    ecology: 'เป็น apex predator ในระบบนิเวศน้ำนิ่ง มีพฤติกรรมปกป้องลูกปลาในระยะแรก ตัวเมียวางไข่ลอยน้ำ ตัวผู้เฝ้าดูแลไข่จนฟักออก',
    conservation: 'LC (Least Concern) – ประชากรค่อนข้างคงที่ แต่มีการจับมากเกินไปในบางพื้นที่',
    economicValue: 'ปลาเศรษฐกิจที่สำคัญมากในภาคเกษตรกรรม ราคาตลาดสูง นิยมบริโภคทั้งในรูปสดและแปรรูปเป็นปลาแดดเดียว ปลาเค็ม',
    tags: ['ปลาน้ำจืด', 'Snakehead', 'ปลาเศรษฐกิจ', 'Channidae'],
    funFact: 'ปลาช่อนสามารถเดินบนบกได้โดยใช้ครีบอก ทำให้ได้ชื่อภาษาอังกฤษว่า "Walking Snakehead" และสามารถเดินทางข้ามทุ่งนาเพื่อหาแหล่งน้ำใหม่',
    differences: [
      { id: 0, label: '🟢 สีลำตัว',   desc: 'สีลำตัวเขียวมากขึ้นแทนสีน้ำตาล',    rx: 0.15, ry: 0.25, rw: 0.70, rh: 0.50 },
      { id: 1, label: '⚫ ลวดลาย',    desc: 'จุดด่างดำน้อยลง',                     rx: 0.25, ry: 0.33, rw: 0.55, rh: 0.36 },
      { id: 2, label: '👁 ดวงตา',      desc: 'ดวงตามีขนาดใหญ่ขึ้น',                rx: 0.07, ry: 0.38, rw: 0.15, rh: 0.18 },
      { id: 3, label: '🟠 ขอบครีบหลัง', desc: 'ขอบครีบหลังมีสีส้ม-แดง',           rx: 0.28, ry: 0.25, rw: 0.55, rh: 0.22 },
      { id: 4, label: '🟠 ครีบหาง',   desc: 'ครีบหางมีสีส้ม',                      rx: 0.76, ry: 0.32, rw: 0.22, rh: 0.34 }
    ],
    timerSeconds: { easy: 120, medium: 90, hard: 60 }
  },
  {
    id: 'tapian',
    name: 'ปลาตะเพียนทอง',
    sciName: 'Barbonymus altus',
    family: 'Cyprinidae',
    emoji: '🐡',
    imgOrig: 'images/tapian_orig.jpg',
    imgDiff: 'images/tapian_diff.jpg',
    habitat: 'แม่น้ำสายหลักและสาขา, อ่างเก็บน้ำ, ทะเลสาบน้ำจืด',
    distribution: 'ลุ่มแม่น้ำเจ้าพระยา, แม่โขง, ทะเลสาบสงขลา, แม่กลอง',
    size: 'ความยาวสูงสุด 35 ซม. น้ำหนักสูงสุด 1.5 กก.',
    biology: 'ปลาตะเพียนทองเป็นปลาในวงศ์ Cyprinidae มีเกล็ดสีทองอันเป็นเอกลักษณ์ มีฟัน pharyngeal (คอหอย) สำหรับบดอาหาร ไม่มีฟันในปาก ครีบหลังมีก้านครีบแข็งที่มีหนามแหลม',
    ecology: 'กินพืชน้ำ สาหร่าย แพลงก์ตอนพืช และสิ่งมีชีวิตขนาดเล็ก มีบทบาทสำคัญในการหมุนเวียนสารอาหารในระบบนิเวศทางน้ำ วางไข่ติดกับพืชน้ำในช่วงฤดูฝน',
    conservation: 'LC (Least Concern) – แต่บางประชากรในแหล่งน้ำธรรมชาติลดลงเนื่องจากการจับมากเกินไป',
    economicValue: 'ปลาเศรษฐกิจสำคัญ มีการเลี้ยงในบ่อเพาะเลี้ยงอย่างแพร่หลาย ผลผลิตสูง ต้นทุนต่ำ เหมาะสำหรับการเพาะเลี้ยงสัตว์น้ำเชิงพาณิชย์',
    tags: ['ปลาน้ำจืด', 'Cyprinidae', 'ปลาเศรษฐกิจ', 'เพาะเลี้ยง'],
    funFact: 'ปลาตะเพียนมีความสำคัญทางวัฒนธรรมไทยมาก เป็นสัญลักษณ์แห่งความอุดมสมบูรณ์ และปรากฏอยู่ในงานศิลปะไทยโบราณหลายชิ้น',
    differences: [
      { id: 0, label: '🟡 สีลำตัว',   desc: 'ลำตัวเหลือง-ทองมากขึ้นแทนสีเงิน',   rx: 0.15, ry: 0.20, rw: 0.65, rh: 0.65 },
      { id: 1, label: '🟠 สีครีบ',    desc: 'ครีบเปลี่ยนเป็นสีส้มแทนสีแดง',        rx: 0.20, ry: 0.56, rw: 0.54, rh: 0.32 },
      { id: 2, label: '👁 ดวงตา',      desc: 'ดวงตามีขนาดใหญ่และเด่นขึ้น',          rx: 0.08, ry: 0.44, rw: 0.14, rh: 0.18 },
      { id: 3, label: '⬛ ปลายครีบหลัง', desc: 'ปลายครีบหลังไม่มีสีดำ',            rx: 0.36, ry: 0.08, rw: 0.28, rh: 0.30 },
      { id: 4, label: '🔵 เส้นข้าง',  desc: 'มีแถบสีน้ำเงินตามแนวเส้นข้างลำตัว',  rx: 0.25, ry: 0.44, rw: 0.55, rh: 0.20 }
    ],
    timerSeconds: { easy: 120, medium: 90, hard: 60 }
  },
  {
    id: 'nin',
    name: 'ปลานิล',
    sciName: 'Oreochromis niloticus',
    family: 'Cichlidae',
    emoji: '🐟',
    imgOrig: 'images/nin_orig.jpg',
    imgDiff: 'images/nin_diff.jpg',
    habitat: 'บ่อเลี้ยงปลา, แม่น้ำ, อ่างเก็บน้ำ, คลอง',
    distribution: 'นำเข้าจากแอฟริกาตะวันออก ปัจจุบันพบทั่วทุกภาคของไทย',
    size: 'ความยาวสูงสุด 60 ซม. น้ำหนักสูงสุด 4.3 กก.',
    biology: 'ปลานิลเป็นปลาในวงศ์ Cichlidae มีลักษณะเด่นคือลายแถบแนวตั้งบนลำตัว มีพฤติกรรมฟักไข่ในปาก (mouthbrooding) โดยปลาตัวเมียฟักไข่และเลี้ยงลูกในปากเพื่อปกป้องจากนักล่า',
    ecology: 'เป็นปลาที่กินได้ทั้งพืชและสัตว์ (omnivore) ทนทานต่อสภาพแวดล้อมที่เปลี่ยนแปลง ทนต่อน้ำเสียและออกซิเจนต่ำได้ดี เติบโตเร็ว',
    conservation: 'เป็นชนิดพันธุ์ต่างถิ่น (exotic species) ที่อาจส่งผลกระทบต่อปลาพื้นเมืองได้ผ่านการแข่งขันแย่งอาหารและที่อยู่อาศัย',
    economicValue: 'ปลาเศรษฐกิจอันดับหนึ่งของไทย ผลผลิตสูงสุดในกลุ่มปลาน้ำจืดเพาะเลี้ยง ส่งออกทั้งปลาสดและแปรรูปมูลค่าหลายพันล้านบาทต่อปี',
    tags: ['ปลาน้ำจืด', 'Cichlidae', 'ปลาเศรษฐกิจ', 'Mouthbrooder', 'Exotic Species'],
    funFact: 'พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดชทรงรับปลานิล 50 ตัวมาจากจักรพรรดิญี่ปุ่นในปี พ.ศ. 2508 แล้วทรงทดลองเลี้ยงในสระน้ำในพระตำหนักจิตรลดาก่อนเผยแพร่สู่เกษตรกร',
    differences: [
      { id: 0, label: '🔵 สีลำตัว',   desc: 'ลำตัวมีสีน้ำเงินมากขึ้น',             rx: 0.15, ry: 0.20, rw: 0.65, rh: 0.65 },
      { id: 1, label: '▪ จำนวนลาย',  desc: 'แถบดำบนลำตัวน้อยลง',                  rx: 0.25, ry: 0.22, rw: 0.52, rh: 0.55 },
      { id: 2, label: '👁 ดวงตา',      desc: 'ดวงตามีขนาดใหญ่ขึ้น',                rx: 0.10, ry: 0.36, rw: 0.15, rh: 0.18 },
      { id: 3, label: '🔴 ครีบหลัง',  desc: 'ก้านครีบหลังมีสีแดง-ส้ม',             rx: 0.28, ry: 0.10, rw: 0.52, rh: 0.32 },
      { id: 4, label: '🟠 ครีบหาง',   desc: 'ครีบหางมีจุดสีส้ม',                    rx: 0.72, ry: 0.26, rw: 0.24, rh: 0.42 }
    ],
    timerSeconds: { easy: 120, medium: 90, hard: 60 }
  },
  {
    id: 'duk',
    name: 'ปลาดุกอุย',
    sciName: 'Clarias macrocephalus',
    family: 'Clariidae',
    emoji: '🐠',
    imgOrig: 'images/duk_orig.jpg',
    imgDiff: 'images/duk_diff.jpg',
    habitat: 'ทุ่งนา, บึง, แหล่งน้ำขุ่น, คลอง, แม่น้ำ',
    distribution: 'พบทั่วไปในภาคกลาง, ภาคเหนือ, ภาคตะวันออกเฉียงเหนือของไทย',
    size: 'ความยาวสูงสุด 45 ซม. น้ำหนักสูงสุด 1.5 กก.',
    biology: 'ปลาดุกอุยในวงศ์ Clariidae มีอวัยวะหายใจพิเศษ (arborescent organ) ทำให้หายใจอากาศได้โดยตรง มีหนวด (barbel) 4 คู่รวม 8 เส้นรอบปาก ช่วยในการหาอาหารในที่มืดและน้ำขุ่น ไม่มีเกล็ด',
    ecology: 'เป็น nocturnal feeder กินได้ทั้งพืชและสัตว์ที่ตายแล้ว มีบทบาทเป็น scavenger สำคัญในระบบนิเวศ ช่วยย่อยสลายสารอินทรีย์ในแหล่งน้ำ',
    conservation: 'LC (Least Concern) – ประชากรป่าลดลง แต่มีการเพาะเลี้ยงจำนวนมาก',
    economicValue: 'ปลาเศรษฐกิจที่มีความต้องการสูงในตลาดภายในประเทศ เนื้อมีไขมันสูง มีรสชาติดี นิยมปรุงเป็นปลาดุกย่าง, ต้มส้ม, ลาบ',
    tags: ['ปลาน้ำจืด', 'Clariidae', 'ไม่มีเกล็ด', 'ปลาเศรษฐกิจ', 'Scavenger'],
    funFact: 'ปลาดุกสามารถอยู่นอกน้ำได้นานหลายชั่วโมงและเดินบนบกโดยใช้ครีบอก ทำให้ได้รับฉายาว่า "Walking catfish" และถูกนำมาเป็นชนิดพันธุ์ต่างถิ่นที่รุกรานในสหรัฐอเมริกา',
    differences: [
      { id: 0, label: '🟤 สีลำตัว',   desc: 'ลำตัวสีน้ำตาล-เทาอ่อนกว่าเดิม',     rx: 0.18, ry: 0.30, rw: 0.68, rh: 0.45 },
      { id: 1, label: '〰 จำนวนหนวด', desc: 'หนวดน้อยลง (6 เส้น แทน 8 เส้น)',    rx: 0.04, ry: 0.34, rw: 0.30, rh: 0.40 },
      { id: 2, label: '👁 ดวงตา',      desc: 'ดวงตามีขนาดใหญ่ขึ้น',                rx: 0.15, ry: 0.42, rw: 0.14, rh: 0.16 },
      { id: 3, label: '🟠 ขอบครีบหลัง', desc: 'ขอบครีบหลังมีสีน้ำตาล-ส้ม',        rx: 0.38, ry: 0.26, rw: 0.46, rh: 0.22 },
      { id: 4, label: '🟤 ครีบหาง',   desc: 'ครีบหางมีสีน้ำตาลกลมมากขึ้น',        rx: 0.78, ry: 0.36, rw: 0.18, rh: 0.26 }
    ],
    timerSeconds: { easy: 120, medium: 90, hard: 60 }
  },
  {
    id: 'sawai',
    name: 'ปลาสวาย',
    sciName: 'Pangasianodon hypophthalmus',
    family: 'Pangasiidae',
    emoji: '🦈',
    imgOrig: 'images/sawai_orig.jpg',
    imgDiff: 'images/sawai_diff.jpg',
    habitat: 'แม่น้ำขนาดใหญ่, อ่างเก็บน้ำขนาดใหญ่',
    distribution: 'ลุ่มแม่น้ำเจ้าพระยา, แม่น้ำโขง, มีการเพาะเลี้ยงทั่วประเทศ',
    size: 'ความยาวสูงสุด 130 ซม. น้ำหนักสูงสุด 44 กก.',
    biology: 'ปลาสวายในวงศ์ Pangasiidae เป็นปลาไม่มีเกล็ด มีรูปร่างคล้ายฉลาม มีหนวด 2 คู่ มีถุงลมขนาดใหญ่ช่วยในการทรงตัว เป็นปลาที่อพยพระยะไกล (migratory fish) ตามฤดูกาล',
    ecology: 'กินพืชน้ำ, ผลไม้ที่ร่วงลงน้ำ, แพลงก์ตอน เป็นปลาฝูงขนาดใหญ่ที่อพยพขึ้นไปวางไข่บริเวณต้นน้ำในช่วงฤดูฝน การสร้างเขื่อนกั้นแม่น้ำส่งผลกระทบต่อการอพยพ',
    conservation: 'EN (Endangered) – IUCN ประชากรลดลงอย่างรวดเร็วจากการทำประมงมากเกินไปและการสร้างเขื่อน',
    economicValue: 'ปลาเศรษฐกิจมูลค่าสูงมาก เนื้อสีขาว ไม่มีก้าง ส่งออกในชื่อ "Basa fish" หรือ "Pangasius" มูลค่าส่งออกหลายพันล้านบาทต่อปี',
    tags: ['ปลาน้ำจืด', 'Pangasiidae', 'ไม่มีเกล็ด', 'ปลาอพยพ', 'EN'],
    funFact: 'ปลาสวายป่า (wild Mekong giant catfish) สามารถเติบโตได้ถึง 300 กก. และยาวถึง 3 เมตร เป็นปลาน้ำจืดที่ใหญ่ที่สุดในโลก แต่ปัจจุบันใกล้สูญพันธุ์อย่างยิ่ง',
    differences: [
      { id: 0, label: '🔵 สีลำตัว',   desc: 'ลำตัวสีเทา-น้ำเงินเข้มขึ้น',          rx: 0.15, ry: 0.30, rw: 0.68, rh: 0.45 },
      { id: 1, label: '〰 จำนวนหนวด', desc: 'หนวดน้อยลง (2 เส้น แทน 4 เส้น)',    rx: 0.06, ry: 0.46, rw: 0.22, rh: 0.28 },
      { id: 2, label: '👁 ดวงตา',      desc: 'ดวงตามีขนาดใหญ่ขึ้น',                rx: 0.10, ry: 0.44, rw: 0.15, rh: 0.18 },
      { id: 3, label: '🟡 ครีบหลัง',  desc: 'โคนครีบหลังมีสีเหลืองอ่อน',           rx: 0.33, ry: 0.17, rw: 0.22, rh: 0.25 },
      { id: 4, label: '⚖ ครีบหาง',   desc: 'แฉกครีบหางมีขนาดเท่ากันมากขึ้น',      rx: 0.68, ry: 0.25, rw: 0.28, rh: 0.52 }
    ],
    timerSeconds: { easy: 120, medium: 90, hard: 60 }
  }
];

const DIFF_COUNTS = { easy: 5, medium: 7, hard: 10 };

const ACHIEVEMENTS = [
  { id: 'first_blood', icon: '🎯', name: 'นักสังเกต',       desc: 'พบข้อผิดพลาดครั้งแรก',              condition: s => s.totalFound >= 1 },
  { id: 'speed_demon', icon: '⚡', name: 'สายเร็ว',         desc: 'ผ่านด่านภายใน 30 วินาที',            condition: s => s.fastLevels >= 1 },
  { id: 'perfect',     icon: '💎', name: 'สมบูรณ์แบบ',      desc: 'ผ่านด่านโดยไม่คลิกผิด',             condition: s => s.perfectLevels >= 1 },
  { id: 'no_hint',     icon: '🧠', name: 'ไม่ง้อใบ้',        desc: 'ผ่านครบทุกด่านโดยไม่ใช้คำใบ้',      condition: s => s.hintsUsed === 0 },
  { id: 'scholar',     icon: '📚', name: 'นักวิทยาศาสตร์',  desc: 'เปิดดูข้อมูลวิทย์ทุกด่าน',           condition: s => s.infoOpened >= 6 },
  { id: 'champion',    icon: '🏆', name: 'แชมป์ปลา',        desc: 'ผ่านเกมครบทุกด่าน',                   condition: s => s.levelsCompleted >= 6 }
];

// ==================== STATE ====================
let state = {
  difficulty: 'easy',
  currentLevel: 0,
  score: 0,
  timer: 90,
  timerInterval: null,
  hintsLeft: 3,
  hintsUsed: 0,
  diffFound: [],
  wrongClicks: 0,
  levelStartTime: 0,
  levelElapsed: 0,
  activeDiffs: [],       // subset of fish.differences for this round
  hintedDiffs: [],
  infoOpen: false,
  totalFound: 0,
  fastLevels: 0,
  perfectLevels: 0,
  infoOpened: 0,
  levelsCompleted: 0,
  levelWrongClicks: 0,
  totalTime: 0
};

// Loaded images cache
const imgCache = {};

// ==================== UTILS ====================
function $(id) { return document.getElementById(id); }
function formatTime(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return m > 0 ? `${m}:${sec.toString().padStart(2,'0')}` : `${sec}s`;
}
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}
function showPopup(text, isGood = true) {
  const p = $('found-popup');
  $('found-popup-text').textContent = text;
  p.style.background = isGood
    ? 'linear-gradient(135deg,#06d6a0,#00b4d8)'
    : 'linear-gradient(135deg,#ef233c,#9b1a27)';
  p.classList.remove('show'); void p.offsetWidth;
  p.classList.add('show');
  setTimeout(() => p.classList.remove('show'), 900);
}
function flashWrong() {
  const f = $('wrong-flash');
  f.classList.remove('show'); void f.offsetWidth;
  f.classList.add('show');
  setTimeout(() => f.classList.remove('show'), 500);
}

// ==================== IMAGE LOADING ====================
function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (imgCache[src]) { resolve(imgCache[src]); return; }
    const img = new Image();
    img.onload = () => { imgCache[src] = img; resolve(img); };
    img.onerror = reject;
    img.src = src;
  });
}

async function preloadLevelImages(levelIdx) {
  const fish = FISH_DATA[levelIdx];
  await Promise.all([loadImage(fish.imgOrig), loadImage(fish.imgDiff)]);
  // Also preload next level
  if (levelIdx + 1 < FISH_DATA.length) {
    const next = FISH_DATA[levelIdx + 1];
    loadImage(next.imgOrig).catch(() => {});
    loadImage(next.imgDiff).catch(() => {});
  }
}

// ==================== CANVAS RENDERING ====================
let CW = 600, CH = 380;

function setupCanvases() {
  const gameArea = $('game-area');
  if (!gameArea) return;
  const isMobile = window.innerWidth <= 600;
  const isLandscape = window.innerWidth > window.innerHeight;

  let maxW, maxH;
  if (isMobile && !isLandscape) {
    maxW = Math.max(200, gameArea.clientWidth - 16);
    maxH = Math.max(120, Math.floor((gameArea.clientHeight - 36) / 2));
  } else {
    maxW = Math.max(200, Math.floor((gameArea.clientWidth - 52) / 2));
    maxH = Math.max(120, gameArea.clientHeight - 16);
  }

  // Preserve 16:9 canvas aspect ratio to fit snugly within maxW and maxH
  const targetRatio = 16 / 9;
  if (maxW / maxH > targetRatio) {
    CH = maxH;
    CW = Math.floor(maxH * targetRatio);
  } else {
    CW = maxW;
    CH = Math.floor(maxW / targetRatio);
  }

  ['canvas-left', 'canvas-right'].forEach(id => {
    const c = $(id);
    if (c) {
      c.width = CW;
      c.height = CH;
    }
  });

  ['left-wrap', 'right-wrap'].forEach(id => {
    const wrap = $(id);
    if (wrap) {
      wrap.style.width = CW + 'px';
      wrap.style.height = CH + 'px';
      wrap.style.flex = '0 0 auto';
    }
  });
}

function renderCanvases() {
  const fish = FISH_DATA[state.currentLevel];
  const cL = $('canvas-left'), cR = $('canvas-right');
  const ctxL = cL.getContext('2d'), ctxR = cR.getContext('2d');

  function drawFishImage(ctx, img) {
    ctx.clearRect(0, 0, CW, CH);
    // Slight underwater tint background
    const bg = ctx.createLinearGradient(0, 0, 0, CH);
    bg.addColorStop(0, 'rgba(0,20,50,0.18)');
    bg.addColorStop(1, 'rgba(0,10,30,0.28)');

    // Draw image to fit canvas maintaining aspect ratio
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.min(CW / iw, CH / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = (CW - dw) / 2, dy = (CH - dh) / 2;

    ctx.fillStyle = 'rgba(240,248,255,0.95)';
    ctx.fillRect(0, 0, CW, CH);
    ctx.drawImage(img, dx, dy, dw, dh);

    // Store draw offset for click mapping
    return { dx, dy, dw, dh, scale };
  }

  const origImg = imgCache[fish.imgOrig];
  const diffImg = imgCache[fish.imgDiff];

  if (origImg) {
    const layout = drawFishImage(ctxL, origImg);
    state.imgLayout = layout;
  } else {
    ctxL.fillStyle = '#011627';
    ctxL.fillRect(0, 0, CW, CH);
    ctxL.fillStyle = 'rgba(202,240,248,0.5)';
    ctxL.font = '14px Sarabun';
    ctxL.textAlign = 'center';
    ctxL.fillText('กำลังโหลด...', CW / 2, CH / 2);
  }
  if (diffImg) {
    drawFishImage(ctxR, diffImg);
    // Draw found markers on left and right
    drawFoundOverlays(ctxL, ctxR, origImg);
  }
}

function drawFoundOverlays(ctxL, ctxR, origImg) {
  const layout = state.imgLayout;
  if (!layout) return;

  state.diffFound.forEach(idx => {
    const diff = state.activeDiffs[idx];
    if (!diff) return;
    // Map diff region from image coords to canvas coords
    const x = layout.dx + diff.rx * layout.dw;
    const y = layout.dy + diff.ry * layout.dh;
    const w = diff.rw * layout.dw;
    const h = diff.rh * layout.dh;

    // Green dashed highlight on LEFT (original)
    ctxL.save();
    ctxL.strokeStyle = 'rgba(6,214,160,0.85)';
    ctxL.lineWidth = 2.5;
    ctxL.setLineDash([6, 4]);
    ctxL.shadowColor = 'rgba(6,214,160,0.6)';
    ctxL.shadowBlur = 6;
    ctxL.strokeRect(x + 1, y + 1, w - 2, h - 2);
    ctxL.restore();

    // Checkmark on right
    ctxR.save();
    ctxR.fillStyle = 'rgba(6,214,160,0.22)';
    ctxR.fillRect(x, y, w, h);
    ctxR.strokeStyle = 'rgba(6,214,160,0.9)';
    ctxR.lineWidth = 2.5;
    ctxR.setLineDash([6, 4]);
    ctxR.strokeRect(x + 1, y + 1, w - 2, h - 2);
    ctxR.restore();
  });

  // Hinted regions (yellow-gold dashed glow on both canvases)
  state.hintedDiffs.forEach(idx => {
    if (state.diffFound.includes(idx)) return;
    const diff = state.activeDiffs[idx];
    if (!diff) return;
    const layout = state.imgLayout;
    const x = layout.dx + diff.rx * layout.dw;
    const y = layout.dy + diff.ry * layout.dh;
    const w = diff.rw * layout.dw;
    const h = diff.rh * layout.dh;

    [ctxL, ctxR].forEach(ctx => {
      ctx.save();
      ctx.strokeStyle = '#ffd166';
      ctx.lineWidth = 2.8;
      ctx.setLineDash([6, 4]);
      ctx.shadowColor = 'rgba(249, 199, 79, 0.85)';
      ctx.shadowBlur = 10;
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = 'rgba(249, 199, 79, 0.12)';
      ctx.fillRect(x, y, w, h);
      ctx.restore();
    });
  });
}

// ==================== CLICK DETECTION (เล่นได้จริงทั้ง 2 ภาพ) ====================
function setupClickLayer() {
  const configs = [
    { layerId: 'click-layer-left', wrapId: 'left-wrap' },
    { layerId: 'click-layer', wrapId: 'right-wrap' }
  ];

  configs.forEach(({ layerId, wrapId }) => {
    const layer = $(layerId);
    const wrap = $(wrapId);
    if (!layer) return;

    const onPointerDown = (clientX, clientY) => {
      const rect = layer.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      handleClick(px, py, layer);
    };

    layer.onclick = (e) => {
      e.stopPropagation();
      onPointerDown(e.clientX, e.clientY);
    };

    layer.ontouchstart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      onPointerDown(touch.clientX, touch.clientY);
    };

    if (wrap) {
      wrap.onclick = (e) => {
        if (e.target === wrap) {
          onPointerDown(e.clientX, e.clientY);
        }
      };
    }
  });
}

function handleClick(px, py, targetLayer) {
  if (!state.timerInterval && state.activeDiffs.length === 0) return;
  const layer = targetLayer || $('click-layer');
  const canvas = (layer && layer.previousElementSibling) ? layer.previousElementSibling : $('canvas-right');
  const scaleX = CW / canvas.clientWidth;
  const scaleY = CH / canvas.clientHeight;
  const cx = px * scaleX, cy = py * scaleY;

  // Map canvas coords back to image-normalized coords
  const layout = state.imgLayout;
  if (!layout) return;
  const normX = (cx - layout.dx) / layout.dw;
  const normY = (cy - layout.dy) / layout.dh;

  let found = false;
  state.activeDiffs.forEach((diff, idx) => {
    if (state.diffFound.includes(idx)) return;
    const isHinted = state.hintedDiffs.includes(idx);
    const pad = isHinted ? 0.09 : 0.05; // 5% normal tolerance, 9% when hinted
    if (normX >= diff.rx - pad && normX <= diff.rx + diff.rw + pad &&
        normY >= diff.ry - pad && normY <= diff.ry + diff.rh + pad) {
      found = true;
      foundDifference(idx, px, py, layer);
    }
  });
  if (!found) wrongClick(px, py, layer);
}

function foundDifference(idx, px, py, targetLayer) {
  state.diffFound.push(idx);
  state.totalFound++;

  // Clear any active hint pin for this difference
  clearHintPinsForDiff(idx);

  const maxTime = FISH_DATA[state.currentLevel].timerSeconds[state.difficulty];
  const pts = Math.max(50, Math.round(100 * (state.timer / maxTime)));
  state.score += pts;
  $('score-val').textContent = state.score;
  $('score-val').classList.add('score-bump');
  setTimeout(() => $('score-val').classList.remove('score-bump'), 400);

  showPopup(`✓ พบแล้ว! +${pts}`, true);
  addMarker(px, py, true, targetLayer);
  updateHintChips();
  updateProgress();
  renderCanvases();

  if (state.diffFound.length >= state.activeDiffs.length) {
    setTimeout(levelComplete, 600);
  }
}

function wrongClick(px, py, targetLayer) {
  state.wrongClicks++;
  state.levelWrongClicks++;
  state.score = Math.max(0, state.score - 20);
  $('score-val').textContent = state.score;
  showPopup('✗ ผิด! -20', false);
  flashWrong();
  addMarker(px, py, false, targetLayer);
}

function addMarker(px, py, correct, targetLayer) {
  const layer = targetLayer || $('click-layer');
  if (!layer) return;

  const m = document.createElement('div');
  m.className = `diff-marker ${correct ? 'correct' : 'wrong'}`;
  m.style.left = px + 'px';
  m.style.top = py + 'px';
  layer.appendChild(m);

  if (!correct) {
    setTimeout(() => m.remove(), 1200);
  } else {
    // If correct, also mirror marker to the other canvas so both show the checkmark!
    const counterpartId = (layer.id === 'click-layer-left') ? 'click-layer' : 'click-layer-left';
    const otherLayer = $(counterpartId);
    if (otherLayer) {
      const m2 = document.createElement('div');
      m2.className = 'diff-marker correct';
      m2.style.left = px + 'px';
      m2.style.top = py + 'px';
      otherLayer.appendChild(m2);
    }
  }
}

// ==================== HINT CHIPS ====================
function updateHintChips() {
  const inner = $('hints-inner');
  if (!inner) return;
  inner.innerHTML = '';
  state.activeDiffs.forEach((diff, idx) => {
    const isFound = state.diffFound.includes(idx);
    const isHinted = state.hintedDiffs.includes(idx);
    const chip = document.createElement('div');
    chip.className = `hint-chip ${isFound ? 'found' : isHinted ? 'hinted' : 'pending'}`;
    chip.innerHTML = `<span>${diff.label}</span>${isFound ? '<span>✓</span>' : isHinted ? '<span>💡</span>' : ''}`;
    
    // Interactive: Click chip to view clue or highlight spot!
    chip.style.cursor = 'pointer';
    chip.title = isFound ? 'พบแล้ว' : isHinted ? 'คลิกเพื่อดูคำใบ้และชี้เป้า' : 'คลิกเพื่อขอคำใบ้สำหรับจุดนี้';
    chip.addEventListener('click', () => {
      if (isFound) return;
      if (isHinted) {
        showHintCenterModal(idx, false);
      } else {
        useHintForSpecificIndex(idx);
      }
    });
    inner.appendChild(chip);
  });
}

function updateProgress() {
  const pct = (state.diffFound.length / state.activeDiffs.length) * 100;
  $('progress-bar').style.width = pct + '%';
  $('diff-found').textContent = state.diffFound.length;
  $('diff-total').textContent = state.activeDiffs.length;
}

// ==================== TIMER ====================
function startTimer() {
  clearInterval(state.timerInterval);
  const maxTime = FISH_DATA[state.currentLevel].timerSeconds[state.difficulty];
  state.timer = maxTime;
  state.levelStartTime = Date.now();
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timer--;
    updateTimerDisplay();
    if (state.timer <= 0) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      timeUp();
    }
  }, 1000);
}
function updateTimerDisplay() {
  $('timer-val').textContent = state.timer;
  $('timer-display').classList.toggle('urgent', state.timer <= 15);
}
function stopTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = null;
  state.levelElapsed = Math.round((Date.now() - state.levelStartTime) / 1000);
}
function timeUp() {
  state.levelElapsed = FISH_DATA[state.currentLevel].timerSeconds[state.difficulty];
  levelComplete(true);
}

// ==================== CENTER SCREEN HINT SYSTEM (คำใบ้ขึ้นกลางจอ + ใช้ได้จริง) ====================

function getDiffLocationText(diff) {
  let horiz = '';
  if (diff.rx < 0.28) horiz = 'ส่วนหัว / ด้านหน้า (ฝั่งซ้าย)';
  else if (diff.rx > 0.65) horiz = 'ส่วนหาง (ฝั่งขวา)';
  else horiz = 'ช่วงกลางลำตัว';

  let vert = '';
  if (diff.ry < 0.30) vert = 'ด้านบน / ครีบหลัง';
  else if (diff.ry > 0.65) vert = 'ด้านล่าง / ครีบท้อง-ก้น';
  else vert = 'กึ่งกลางลำตัว';

  return `${horiz} • ${vert}`;
}

function getDiffDetailedClue(diff, fish) {
  if (diff.label.includes('ตา') || (diff.desc && diff.desc.includes('ตา'))) {
    return 'ลองดูที่ขนาด รูปร่าง หรือประกายของดวงตาระหว่างสองภาพ';
  }
  if (diff.label.includes('สี') || (diff.desc && diff.desc.includes('สี'))) {
    return 'สังเกตโทนสี ความสว่าง หรือเฉดสีของเกล็ดและลำตัว';
  }
  if (diff.label.includes('จุด') || diff.label.includes('ลาย') || (diff.desc && (diff.desc.includes('จุด') || diff.desc.includes('ลาย')))) {
    return 'นับจำนวนจุด หรือดูลวดลายริ้วบนลำตัวว่ามีแถบไหนหายไปหรือเพิ่มขึ้น';
  }
  if (diff.label.includes('ครีบหลัง') || (diff.desc && diff.desc.includes('ครีบหลัง'))) {
    return 'สังเกตก้านครีบหรือสีสันที่ขอบครีบด้านบนของตัวปลา';
  }
  if (diff.label.includes('ครีบหาง') || (diff.desc && diff.desc.includes('ครีบหาง'))) {
    return 'สังเกตสี ขนาด หรือแฉกของครีบหางด้านหลังสุด';
  }
  if (diff.label.includes('หนวด') || (diff.desc && diff.desc.includes('หนวด'))) {
    return 'นับจำนวนเส้นหนวดบริเวณรอบปากของปลา';
  }
  return 'เปรียบเทียบรายละเอียดระหว่างภาพต้นฉบับกับภาพที่ค้นหา';
}

function updateHintButton() {
  const btn = $('btn-hint');
  if (!btn) return;
  btn.innerHTML = `💡 ใช้คำใบ้ (<span id="hint-count">${state.hintsLeft}</span>)`;
  if (state.hintsLeft <= 0) {
    btn.classList.add('no-hints');
  } else {
    btn.classList.remove('no-hints');
  }
}

function useHint() {
  // Check if all found
  if (state.diffFound.length >= state.activeDiffs.length) {
    showHintAlert('🎉 คุณพบจุดต่างครบแล้วในด่านนี้!', 'เตรียมพร้อมสำหรับด่านถัดไปได้เลยครับ');
    return;
  }

  // Find remaining un-found diff indices
  const unFound = state.activeDiffs.map((_, i) => i)
    .filter(i => !state.diffFound.includes(i));
  if (!unFound.length) return;

  // Remaining un-found diffs that haven't been hinted yet
  const unHinted = unFound.filter(i => !state.hintedDiffs.includes(i));

  let hintIdx;
  if (unHinted.length > 0) {
    if (state.hintsLeft <= 0) {
      showHintAlert(
        '💡 คุณใช้คำใบ้ครบ 3 ครั้งแล้วสำหรับด่านนี้!',
        'ลองสังเกตเปรียบเทียบจุดต่างๆ ในภาพดูนะครับ สู้ๆ! 💪'
      );
      return;
    }
    // Pick random unhinted diff
    hintIdx = unHinted[Math.floor(Math.random() * unHinted.length)];
    state.hintsLeft--;
    state.hintsUsed++;
    state.hintedDiffs.push(hintIdx);

    state.score = Math.max(0, state.score - 30);
    const scoreVal = $('score-val');
    if (scoreVal) scoreVal.textContent = state.score;
    updateHintButton();
  } else {
    // All remaining un-found diffs have already been hinted at least once!
    // Re-show the hint for the remaining difference without extra deduction!
    hintIdx = unFound[0];
  }

  updateHintChips();
  renderCanvases();

  // Show Center Screen Hint Modal!
  showHintCenterModal(hintIdx, true);
}

function useHintForSpecificIndex(idx) {
  if (state.diffFound.includes(idx)) return;

  if (!state.hintedDiffs.includes(idx)) {
    if (state.hintsLeft <= 0) {
      showHintAlert(
        '💡 คุณใช้คำใบ้ครบ 3 ครั้งแล้วสำหรับด่านนี้!',
        'ลองสังเกตเปรียบเทียบจุดต่างๆ ในภาพดูนะครับ สู้ๆ! 💪'
      );
      return;
    }

    state.hintsLeft--;
    state.hintsUsed++;
    state.hintedDiffs.push(idx);

    state.score = Math.max(0, state.score - 30);
    const scoreVal = $('score-val');
    if (scoreVal) scoreVal.textContent = state.score;
    updateHintButton();
  }

  updateHintChips();
  renderCanvases();

  showHintCenterModal(idx, true);
}

function showHintCenterModal(hintIdx, isNew = true) {
  const diff = state.activeDiffs[hintIdx];
  const fish = FISH_DATA[state.currentLevel];
  if (!diff) return;

  const modal = $('hint-center-modal');
  if (!modal) return;

  $('hint-remaining-num').textContent = state.hintsLeft;
  $('hint-card-title').textContent = `💡 คำใบ้จุดต่าง: ${diff.label}`;
  $('hint-target-badge').textContent = diff.label;

  const loc = getDiffLocationText(diff);
  $('hint-location-badge').textContent = `📍 ${loc}`;
  $('hint-clue-text').textContent = diff.desc ? `สังเกต: ${diff.desc}` : `มีความแตกต่างที่ ${diff.label}`;
  $('hint-guide-desc').textContent = getDiffDetailedClue(diff, fish);

  modal.dataset.hintIdx = hintIdx;
  modal.style.display = 'flex';
  void modal.offsetWidth;
  modal.classList.add('active');
}

function closeHintModal() {
  const modal = $('hint-center-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    if (!modal.classList.contains('active')) {
      modal.style.display = 'none';
    }
  }, 220);
}

function showHintAlert(title, message) {
  const modal = $('hint-alert-modal');
  if (!modal) return;
  $('hint-alert-title').textContent = title;
  $('hint-alert-message').textContent = message;
  modal.style.display = 'flex';
  void modal.offsetWidth;
  modal.classList.add('active');
}

function closeHintAlert() {
  const modal = $('hint-alert-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    if (!modal.classList.contains('active')) {
      modal.style.display = 'none';
    }
  }, 220);
}

function triggerSpotHighlight(hintIdx) {
  closeHintModal();

  const diff = state.activeDiffs[hintIdx];
  const layout = state.imgLayout;
  if (!diff || !layout) return;

  // Scroll to canvas area smoothly if off-screen (especially on mobile)
  const gameArea = $('game-area');
  if (gameArea) {
    gameArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Create on-screen interactive pin & radar rings
  createHintPins(hintIdx);

  // Flash highlight on canvas
  flashHintHighlight(hintIdx);
}

function createHintPins(hintIdx) {
  clearHintPins();

  const diff = state.activeDiffs[hintIdx];
  const layout = state.imgLayout;
  if (!diff || !layout) return;

  const cx = layout.dx + (diff.rx + diff.rw / 2) * layout.dw;
  const cy = layout.dy + (diff.ry + diff.rh / 2) * layout.dh;

  const targets = [
    { wrap: $('click-layer'), isMain: true },
    { wrap: $('click-layer-left'), isMain: false }
  ];

  targets.forEach(({ wrap, isMain }) => {
    if (!wrap) return;
    const canvas = wrap.previousElementSibling;
    if (!canvas) return;

    const scaleX = canvas.clientWidth / CW;
    const scaleY = canvas.clientHeight / CH;
    const px = cx * scaleX;
    const py = cy * scaleY;

    const pin = document.createElement('div');
    pin.className = 'hint-pin-marker';
    pin.dataset.hintIdx = hintIdx;
    pin.style.left = `${px}px`;
    pin.style.top = `${py}px`;

    pin.innerHTML = `
      <div class="hint-sonar-ring"></div>
      <div class="hint-sonar-ring ring-2"></div>
      <div class="hint-pin-dot">💡</div>
      <div class="hint-pin-tag">${isMain ? 'คลิกตรงนี้! 🎯' : 'คลิกภาพนี้ก็ได้! 🎯'}</div>
    `;

    // Clicking the pin directly finds the difference!
    const onPinClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      foundDifference(hintIdx, px, py, wrap);
    };

    pin.addEventListener('click', onPinClick);
    pin.addEventListener('touchstart', onPinClick, { passive: false });

    wrap.appendChild(pin);
  });
}

function clearHintPins() {
  document.querySelectorAll('.hint-pin-marker').forEach(el => el.remove());
}

function clearHintPinsForDiff(idx) {
  document.querySelectorAll(`.hint-pin-marker[data-hint-idx="${idx}"]`).forEach(el => el.remove());
}

function updateHintPinPositions() {
  clearHintPins();
  state.hintedDiffs.forEach(hintIdx => {
    if (!state.diffFound.includes(hintIdx)) {
      createHintPins(hintIdx);
    }
  });
}

function flashHintHighlight(hintIdx) {
  let flashes = 0;
  const iv = setInterval(() => {
    renderCanvases();
    if (flashes % 2 === 0) {
      const diff = state.activeDiffs[hintIdx];
      const layout = state.imgLayout;
      if (layout) {
        ['canvas-left', 'canvas-right'].forEach(canvasId => {
          const c = $(canvasId);
          if (!c) return;
          const ctx = c.getContext('2d');
          const x = layout.dx + diff.rx * layout.dw;
          const y = layout.dy + diff.ry * layout.dh;
          const w = diff.rw * layout.dw;
          const h = diff.rh * layout.dh;
          ctx.save();
          ctx.fillStyle = 'rgba(249, 199, 79, 0.35)';
          ctx.fillRect(x, y, w, h);
          ctx.strokeStyle = '#ffd166';
          ctx.lineWidth = 3.5;
          ctx.setLineDash([8, 4]);
          ctx.shadowColor = '#f9c74f';
          ctx.shadowBlur = 14;
          ctx.strokeRect(x, y, w, h);
          ctx.restore();
        });
      }
    }
    flashes++;
    if (flashes >= 8) {
      clearInterval(iv);
      renderCanvases();
    }
  }, 260);
}

// ==================== LEVEL FLOW ====================
async function startLevel(levelIdx) {
  state.currentLevel = levelIdx;
  state.diffFound = [];
  state.levelWrongClicks = 0;
  state.hintedDiffs = [];
  state.hintsLeft = 3;
  state.imgLayout = null;

  clearHintPins();
  closeHintModal();
  closeHintAlert();

  updateHintButton();

  const fish = FISH_DATA[levelIdx];
  const maxDiffs = Math.min(DIFF_COUNTS[state.difficulty], fish.differences.length);
  // Shuffle and pick
  const shuffled = [...fish.differences].sort(() => Math.random() - 0.5);
  state.activeDiffs = shuffled.slice(0, maxDiffs);

  $('fish-name-header').textContent = fish.name;
  $('level-text').textContent = `ด่าน ${levelIdx + 1}/${FISH_DATA.length}`;

  showScreen('game-screen');
  setupCanvases();

  // Draw loading state
  ['canvas-left', 'canvas-right'].forEach(id => {
    const ctx = $(id).getContext('2d');
    ctx.fillStyle = '#011627'; ctx.fillRect(0, 0, CW, CH);
    ctx.fillStyle = 'rgba(202,240,248,0.5)';
    ctx.font = `${Math.max(12, CW * 0.03)}px Sarabun`;
    ctx.textAlign = 'center';
    ctx.fillText('กำลังโหลดภาพปลา...', CW / 2, CH / 2);
  });

  if ($('click-layer')) $('click-layer').innerHTML = '';
  if ($('click-layer-left')) $('click-layer-left').innerHTML = '';

  // Load images
  await preloadLevelImages(levelIdx);
  renderCanvases();
  setupClickLayer();

  updateHintChips();
  updateProgress();
  loadFishInfo(fish);
  startTimer();
}

function loadFishInfo(fish) {
  $('fish-info-card').innerHTML = `
    <div class="info-section">
      <h4>🔬 ชื่อวิทยาศาสตร์</h4>
      <p><em>${fish.sciName}</em></p>
      <p>วงศ์: ${fish.family}</p>
    </div>
    <div class="info-section">
      <h4>📍 แหล่งอาศัย</h4>
      <p>${fish.habitat}</p>
      <p>${fish.distribution}</p>
    </div>
    <div class="info-section">
      <h4>📏 ขนาด</h4>
      <p>${fish.size}</p>
    </div>
    <div class="info-section">
      <h4>🧬 ชีววิทยา</h4>
      <p>${fish.biology}</p>
    </div>
    <div class="info-section" style="grid-column:1/-1">
      <h4>🌿 นิเวศวิทยา</h4>
      <p>${fish.ecology}</p>
    </div>
    <div class="info-section">
      <h4>🛡 สถานะอนุรักษ์</h4>
      <p>${fish.conservation}</p>
    </div>
    <div class="info-section">
      <h4>💰 คุณค่าเศรษฐกิจ</h4>
      <p>${fish.economicValue}</p>
    </div>
    <div class="info-section" style="grid-column:1/-1">
      ${fish.tags.map(t => `<span class="info-tag">${t}</span>`).join('')}
    </div>
  `;
}

function levelComplete(timedOut = false) {
  stopTimer();
  clearHintPins();
  closeHintModal();
  closeHintAlert();
  state.levelsCompleted++;
  state.totalTime += state.levelElapsed;

  const found = state.diffFound.length, total = state.activeDiffs.length;
  const pct = found / total;
  const stars = pct >= 1 ? 3 : pct >= 0.6 ? 2 : 1;
  const speedBonus = state.levelElapsed < 30 ? 200 : state.levelElapsed < 60 ? 100 : 0;
  const perfectBonus = state.levelWrongClicks === 0 ? 150 : 0;
  const totalBonus = speedBonus + perfectBonus;
  state.score += totalBonus;
  $('score-val').textContent = state.score;
  if (state.levelElapsed < 30) state.fastLevels++;
  if (state.levelWrongClicks === 0) state.perfectLevels++;

  const fish = FISH_DATA[state.currentLevel];
  $('complete-fish-icon').textContent = fish.emoji;
  $('complete-title').textContent = timedOut && found < total ? `หมดเวลา! (${found}/${total} จุด)` : 'ด่านสำเร็จ! 🎉';
  $('stars-display').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  $('complete-time').textContent = formatTime(state.levelElapsed);
  $('complete-pts').textContent = `+${Math.round(pct * 100 * total * 5)}`;
  $('complete-bonus').textContent = `+${totalBonus}`;
  $('complete-fact').innerHTML = `<strong>💡 รู้หรือไม่?</strong><br>${fish.funFact}`;

  const isLast = state.currentLevel >= FISH_DATA.length - 1;
  $('btn-next-level').textContent = isLast ? '🏆 ดูผลรวม' : 'ด่านต่อไป ▶';
  $('btn-next-level').onclick = () => {
    if (isLast) showVictory();
    else startLevel(state.currentLevel + 1);
  };
  showScreen('level-complete-screen');
}

// ==================== VICTORY ====================
function showVictory() {
  showScreen('victory-screen');
  launchConfetti();
  $('final-score-val').textContent = state.score;
  let rank = 'นักสำรวจปลา 🐟';
  if (state.score >= 3000) rank = 'ดร.ปลา ผู้เชี่ยวชาญ 🏆';
  else if (state.score >= 2000) rank = 'นักชีววิทยาน้ำจืด 🎓';
  else if (state.score >= 1000) rank = 'นักศึกษาวิทยาศาสตร์ 📚';
  $('final-rank').textContent = rank;

  const achGrid = $('achievement-grid');
  achGrid.innerHTML = '';
  ACHIEVEMENTS.forEach((ach, i) => {
    const unlocked = ach.condition(state);
    const card = document.createElement('div');
    card.className = `achievement-card ${unlocked ? 'unlocked' : 'ach-locked'}`;
    card.style.setProperty('--d', `${i * 0.12}s`);
    card.innerHTML = `<div class="ach-icon">${ach.icon}</div><div class="ach-name">${ach.name}</div><div class="ach-desc">${ach.desc}</div>`;
    achGrid.appendChild(card);
  });

  $('victory-summary').innerHTML = `
    <div class="summary-item"><div class="sum-val">${state.levelsCompleted}</div><div class="sum-label">ด่านสำเร็จ</div></div>
    <div class="summary-item"><div class="sum-val">${state.totalFound}</div><div class="sum-label">จุดพบ</div></div>
    <div class="summary-item"><div class="sum-val">${state.wrongClicks}</div><div class="sum-label">คลิกผิด</div></div>
    <div class="summary-item"><div class="sum-val">${formatTime(state.totalTime)}</div><div class="sum-label">เวลารวม</div></div>
    <div class="summary-item"><div class="sum-val">${state.hintsUsed}</div><div class="sum-label">คำใบ้ใช้</div></div>
  `;
}

function launchConfetti() {
  const container = $('confetti-container');
  container.innerHTML = '';
  const colors = ['#f9c74f','#00b4d8','#06d6a0','#ef233c','#caf0f8','#f8961e','#ffffff'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      width:${6 + Math.random() * 10}px;
      height:${10 + Math.random() * 16}px;
      animation-duration:${2 + Math.random() * 3}s;
      animation-delay:${Math.random() * 2}s;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    container.appendChild(piece);
  }
}

// ==================== SPLASH PREVIEW ====================
function drawPreview() {
  const canvas = $('preview-canvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  const origImg = imgCache['images/krai_orig.jpg'];
  if (origImg) {
    ctx.fillStyle = 'rgba(240,248,255,0.95)';
    ctx.fillRect(0, 0, w, h);
    const scale = Math.min(w / origImg.naturalWidth, h / origImg.naturalHeight);
    const dw = origImg.naturalWidth * scale, dh = origImg.naturalHeight * scale;
    ctx.drawImage(origImg, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, h - 28, w, 28);
    ctx.font = 'bold 11px Sarabun';
    ctx.fillStyle = 'rgba(202,240,248,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('ตัวอย่าง: ปลากราย (Chitala ornata)', w / 2, h - 9);
  } else {
    ctx.fillStyle = 'rgba(0,40,80,0.8)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = 'bold 14px Sarabun';
    ctx.fillStyle = 'rgba(202,240,248,0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('🐟  จับผิดภาพปลาน้ำจืดไทย', w / 2, h / 2);
  }
}

// ==================== EVENT LISTENERS ====================
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.difficulty = btn.dataset.diff;
  });
});

$('btn-start').addEventListener('click', () => {
  Object.assign(state, {
    score: 0, totalFound: 0, fastLevels: 0, perfectLevels: 0,
    hintsUsed: 0, infoOpened: 0, levelsCompleted: 0,
    wrongClicks: 0, totalTime: 0
  });
  startLevel(0);
});

$('btn-home').addEventListener('click', () => {
  stopTimer();
  showScreen('splash-screen');
  drawPreview();
});

$('btn-hint').addEventListener('click', useHint);

// ===== HINT MODAL CONTROLS =====
const btnCloseHint = $('btn-close-hint');
if (btnCloseHint) btnCloseHint.addEventListener('click', closeHintModal);

const btnDismissHint = $('btn-dismiss-hint');
if (btnDismissHint) btnDismissHint.addEventListener('click', closeHintModal);

const btnSpotlight = $('btn-spotlight-hint');
if (btnSpotlight) {
  btnSpotlight.addEventListener('click', () => {
    const modal = $('hint-center-modal');
    const hintIdx = parseInt(modal?.dataset.hintIdx, 10);
    if (!isNaN(hintIdx)) {
      triggerSpotHighlight(hintIdx);
    } else {
      closeHintModal();
    }
  });
}

const btnCloseAlert = $('btn-close-hint-alert');
if (btnCloseAlert) btnCloseAlert.addEventListener('click', closeHintAlert);

const btnOkAlert = $('btn-ok-hint-alert');
if (btnOkAlert) btnOkAlert.addEventListener('click', closeHintAlert);

const hintModalEl = $('hint-center-modal');
if (hintModalEl) {
  hintModalEl.addEventListener('click', (e) => {
    if (e.target === hintModalEl) closeHintModal();
  });
}
const alertModalEl = $('hint-alert-modal');
if (alertModalEl) {
  alertModalEl.addEventListener('click', (e) => {
    if (e.target === alertModalEl) closeHintAlert();
  });
}

$('btn-skip').addEventListener('click', () => {
  stopTimer();
  state.score = Math.max(0, state.score - 100);
  $('score-val').textContent = state.score;
  levelComplete(true);
});

$('info-toggle').addEventListener('click', () => {
  const content = $('info-content');
  const arrow = $('info-arrow');
  content.classList.toggle('open');
  arrow.textContent = content.classList.contains('open') ? '▲' : '▼';
  if (content.classList.contains('open')) state.infoOpened++;
});

$('btn-play-again').addEventListener('click', () => {
  showScreen('splash-screen');
  drawPreview();
});

$('btn-share').addEventListener('click', () => {
  const text = `🐟 ฉันเล่นเกมจับผิดภาพปลาน้ำจืดไทย ได้คะแนน ${state.score} คะแนน! 🏆\n#จับผิดปลา #ปลาน้ำจืดไทย`;
  if (navigator.share) navigator.share({ title: 'จับผิดภาพปลา', text });
  else navigator.clipboard?.writeText(text).then(() => alert('คัดลอกข้อความแล้ว!'));
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if ($('game-screen').classList.contains('active')) {
      setupCanvases();
      renderCanvases();
      updateHintPinPositions();
    }
  }, 200);
});

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', async () => {
  // Preload splash preview image
  try {
    await loadImage('images/krai_orig.jpg');
  } catch(e) {}
  drawPreview();
});
