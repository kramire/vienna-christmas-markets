import { Price, PriceType } from '../../../App.types'
import { priceTypeMapping } from '../../../App.constants'
import { useFormatter, useTranslations } from 'next-intl'

interface Props {
  prices: Array<Price>
}

export const Prices = ({ prices }: Props) => {
  const t = useTranslations('slugPage')
  const format = useFormatter()
  return (
    <>
      <h2 className="text-xl font-semibold text-green-950">{t('whatYoullPay')}</h2>
      <span className="text-xs">{t('pricesNote')}</span>
      {prices.map(({ type, value, currency, hasRange = false }) => (
        <div key={type} className="flex items-center justify-between">
          <span>{t(priceTypeMapping[type])}</span>
          <span>
            {hasRange ? 'From ' : ''}
            {type === PriceType.MUG_DEPOSIT && value === 0
              ? t('noDepositFee')
              : format.number(value, { style: 'currency', currency })
            }
          </span>
        </div>
      ))}
    </>
  )
}
