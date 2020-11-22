	DamageCalculator.calculateDamage = function(active, passive, weapon, isCritical, activeTotalStatus, passiveTotalStatus, trueHitValue) {
		var pow, def, damage;

		if (this.isHpMinimum(active, passive, weapon, isCritical, trueHitValue)) {
			return -1;
		}

		pow = this.calculateAttackPower(active, passive, weapon, isCritical, activeTotalStatus, trueHitValue);
		def = this.calculateDefense(active, passive, weapon, isCritical, passiveTotalStatus, trueHitValue);
		
		if (this.isCritical(active, passive, weapon, isCritical, trueHitValue)) {
			pow = Math.floor(pow * this.getCriticalFactor());
		}

		damage = pow - def;
		if (this.isHalveAttack(active, passive, weapon, isCritical, trueHitValue)) {
			if (!this.isHalveAttackBreak(active, passive, weapon, isCritical, trueHitValue)) {
				damage = Math.floor(damage / 2);
			}
		}

		return this.validValue(active, passive, weapon, damage);
	}
