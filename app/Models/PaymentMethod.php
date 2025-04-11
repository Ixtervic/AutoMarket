<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PaymentMethod extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentMethodFactory> */
    use HasFactory;

    public function suscrptions(): HasMany
    {
        return $this->hasMany(Suscription::class);
    }

    public function card(): HasOne
    {
        return $this->hasOne(Card::class);
    }
}
