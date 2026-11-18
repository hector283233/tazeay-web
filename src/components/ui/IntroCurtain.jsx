import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const seen = () => { try { return sessionStorage.getItem('intro') === '1' } catch { return true } }

export default function IntroCurtain() {
  const [show, setShow] = useState(() => !seen())
  const finish = () => setTimeout(() => {
    try { sessionStorage.setItem('intro', '1') } catch { /* storage unavailable (private mode) */ }
    setShow(false)
  }, 450)

  return (
    <AnimatePresence>
      {show && (
        <motion.div aria-hidden="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0D1B13]"
          exit={{ y: '-100%' }} transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}>
          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }} onAnimationComplete={finish}
            className="flex h-20 w-36 items-center justify-center rounded-[50%] bg-[#C8102E] shadow-[inset_0_0_0_3px_#F4B400]">
            <span className="text-[26px] font-bold italic text-[#FFD23F]">Täze Aý</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}