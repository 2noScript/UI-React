import classNames from 'classnames/bind'
import { useEffect, useRef } from 'react'
import styles from './InputRange.module.scss'
const cx = classNames.bind(styles)

export const InputRange = props => {
	const { min, max, className, step, onChange, value } = props
	const progress = useRef()
	useEffect(() => {
		progress.current.style.setProperty(
			'--background-size',
			`${((value || min - min) / (max - min)) * 100}%`
		)
	}, [value, progress, min, max])

	const handleChange = e => {
		let min = +e.target.min || 0
		let max = +e.target.max || 100
		let value = +e.target.value
		e.target.style.setProperty(
			'--background-size',
			`${((value - min) / (max - min)) * 100}%`
		)
		onChange(e)
	}
	return (
		<div className={cx('InputRange', className)}>
			<input
				type='range'
				onChange={handleChange}
				value={value || min}
				ref={progress}
				min={min}
				max={max}
				step={step}
			/>
		</div>
	)
}
